const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); 

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seed...");

  // 1. Create Organizations (All 5 RLDCs + Global Orgs)
  const orgNames = [
    'NLDC', 'NRLDC', 'SRLDC', 'NERLDC', 'WRLDC', 'ERLDC', 
    'SOC_ORG', 'IT_ORG'
  ];
  
  const orgs: any = {};
  for (const name of orgNames) {
    orgs[name] = await prisma.organization.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  // 2. Create Users (Password for all: password123)
  const hashedPassword = await bcrypt.hash("password123", 10);
  
  const usersToCreate = [
    // --- GLOBAL ROLES (Sees Everything) ---
    { name: "Super Admin", email: "admin@gridindia.in", role: "ADMIN", orgId: orgs['NLDC'].id, key: "ADMIN" },
    { name: "NLDC Coordinator", email: "nldc@gridindia.in", role: "NLDC", orgId: orgs['NLDC'].id, key: "NLDC" },
    { name: "Chief Info Sec Officer", email: "ciso@gridindia.in", role: "CISO", orgId: orgs['NLDC'].id, key: "CISO" },
    { name: "SOC Analyst", email: "soc@gridindia.in", role: "SOC", orgId: orgs['SOC_ORG'].id, key: "SOC" },
    { name: "IT Administrator", email: "it@gridindia.in", role: "IT", orgId: orgs['IT_ORG'].id, key: "IT" },
    
    // --- REGIONAL ROLES (Restricted to their mapped entities) ---
    { name: "NRLDC Coord", email: "nrldc@gridindia.in", role: "RLDC", orgId: orgs['NRLDC'].id, key: "NRLDC" },
    { name: "SRLDC Coord", email: "srldc@gridindia.in", role: "RLDC", orgId: orgs['SRLDC'].id, key: "SRLDC" },
    { name: "NERLDC Coord", email: "nerldc@gridindia.in", role: "RLDC", orgId: orgs['NERLDC'].id, key: "NERLDC" },
    { name: "WRLDC Coord", email: "wrldc@gridindia.in", role: "RLDC", orgId: orgs['WRLDC'].id, key: "WRLDC" },
    { name: "ERLDC Coord", email: "erldc@gridindia.in", role: "RLDC", orgId: orgs['ERLDC'].id, key: "ERLDC" },
  ];

  const dbUsers: any = {};
  for (const u of usersToCreate) {
    dbUsers[u.key] = await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role, organizationId: u.orgId }, // Ensure existing users get the right orgId
      create: { 
        name: u.name, 
        email: u.email, 
        password: hashedPassword, 
        role: u.role as any, 
        organizationId: u.orgId 
      }
    });
  }

  // 3. Map Existing Entities to SRLDC
  console.log(" Searching for existing entities to map to SRLDC...");
  
  // Find the entities you already created from the frontend/DB
  const existingEntities = await prisma.entity.findMany({
    where: {
      name: {
        in: ['TAMILNADU SLDC', 'APSLDC']
      }
    }
  });

  if (existingEntities.length === 0) {
    console.log(" No matching entities found yet. You can create them from the frontend later.");
  } else {
    for (const entity of existingEntities) {
      await mapEntityToUser(entity.id, dbUsers['SRLDC'].id);
      console.log(` Mapped '${entity.name}' to SRLDC successfully!`);
    }
  }

  console.log(" Database Seed completed successfully!");
}

// Helper function to safely upsert the mappings
async function mapEntityToUser(entityId: string, controllerId: string) {
  await prisma.entityControllerMapping.upsert({
    where: { entityId_controllerId: { entityId, controllerId } },
    update: {},
    create: { entityId, controllerId }
  });
}

main()
  .catch((e) => {
    console.error(" Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });