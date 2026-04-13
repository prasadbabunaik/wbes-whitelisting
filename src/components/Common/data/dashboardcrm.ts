const avatar1 = "/images/users/avatar-1.jpg";
const avatar2 = "/images/users/avatar-2.jpg";
const avatar3 = "/images/users/avatar-3.jpg";
const avatar4 = "/images/users/avatar-4.jpg";
const avatar5 = "/images/users/avatar-5.jpg";
const avatar6 = "/images/users/avatar-6.jpg";
const avatar7 = "/images/users/avatar-7.jpg";
const avatar8 = "/images/users/avatar-8.jpg";

const crmWidgets = [
  {
    id: 1,
    label: "Campaign Sent",
    badge: "ri-arrow-up-circle-line text-success",
    icon: "ri-space-ship-line",
    counter: 197,
    decimals: 0,
    suffix: "",
    prefix: "",
  },
  {
    id: 2,
    label: "Annual Profit",
    badge: "ri-arrow-up-circle-line text-success",
    icon: "ri-exchange-dollar-line",
    counter: 489.4,
    decimals: 1,
    suffix: "k",
    prefix: "$",
  },
  {
    id: 3,
    label: "Lead Conversation",
    badge: "ri-arrow-down-circle-line text-danger",
    icon: "ri-pulse-line",
    counter: 32.89,
    decimals: 2,
    suffix: "%",
    prefix: "",
  },
  {
    id: 4,
    label: "Daily Average Income",
    badge: "ri-arrow-up-circle-line text-success",
    icon: "ri-trophy-line",
    counter: 1596.5,
    decimals: 1,
    prefix: "$",
    separator: ",",
    suffix: "",
  },
  {
    id: 5,
    label: "Annual Deals",
    badge: "ri-arrow-down-circle-line text-danger",
    icon: "ri-service-line",
    counter: 2659,
    decimals: 0,
    separator: ",",
    suffix: "",
    prefix: "",
  },
];

const dealsStatus = [
  {
    id: 1,
    name: "Absternet LLC",
    date: "Sep 20, 2021",
    img: avatar1,
    representativeName: "Donald Risher",
    badgeClass: "success",
    status: "Deal Won",
    statusValue: "$100.1K",
  },
  {
    id: 2,
    name: "Raitech Soft",
    date: "Sep 23, 2021",
    img: avatar2,
    representativeName: "Sofia Cunha",
    badgeClass: "warning",
    status: "Intro Call",
    statusValue: "$150K",
  },
  {
    id: 3,
    name: "William PVT",
    date: "Sep 27, 2021",
    img: avatar3,
    representativeName: "Luis Rocha",
    badgeClass: "danger",
    status: "Stuck",
    statusValue: "$78.18K",
  },
  {
    id: 4,
    name: "Loiusee LLP",
    date: "Sep 30, 2021",
    img: avatar4,
    representativeName: "Vitoria Rodrigues",
    badgeClass: "success",
    status: "Deal Won",
    statusValue: "$180K",
  },
  {
    id: 5,
    name: "Apple Inc.",
    date: "Sep 30, 2021",
    img: avatar6,
    representativeName: "Vitoria Rodrigues",
    badgeClass: "info",
    status: "New Lead",
    statusValue: "$78.9K",
  },
];

const tasks = [
  {
    id: 1,
    forId: "task_one",
    text: "Review and make sure nothing slips through cracks",
    date: "15 Sep, 2021",
  },
  {
    id: 2,
    forId: "task_two",
    text: "Send meeting invites for sales upcampaign",
    date: "20 Sep, 2021",
  },
  {
    id: 3,
    forId: "task_three",
    text: "Weekly closed sales won checking with sales team",
    date: "24 Sep, 2021",
  },
  {
    id: 4,
    forId: "task_four",
    text: "Add notes that can be viewed from the individual view",
    date: "27 Sep, 2021",
  },
  {
    id: 5,
    forId: "task_five",
    text: "Move stuff to another page",
    date: "27 Sep, 2021",
  },
  {
    id: 6,
    forId: "task_six",
    text: "Styling wireframe design and documentation for velzon admin",
    date: "27 Sep, 2021",
  },
];

const activities = [
  {
    id: 1,
    date: "25",
    weekDay: "Tue",
    time: "12:00am - 03:30pm",
    caption: "Meeting for campaign with sales team",
    subItem: [
      { id: 1, img: avatar1 },
      { id: 2, img: avatar2 },
      { id: 3, img: avatar3 },
    ],
    imgNumber: "5",
    bgcolor: "bg-info",
  },
  {
    id: 2,
    date: "20",
    weekDay: "Wed",
    time: "02:00pm - 03:45pm",
    caption: "Adding a new event with attachments",
    subItem: [
      { id: 1, img: avatar4 },
      { id: 2, img: avatar5 },
      { id: 3, img: avatar6 },
      { id: 4, img: avatar7 },
    ],
    imgNumber: "3",
    bgcolor: "bg-success",
  },
  {
    id: 3,
    date: "17",
    weekDay: "Wed",
    time: "04:30pm - 07:15pm",
    caption: "Create new project Bundling Product",
    subItem: [
      { id: 1, img: avatar8 },
      { id: 2, img: avatar1 },
      { id: 3, img: avatar2 },
    ],
    imgNumber: "4",
    bgcolor: "bg-primary",
  },
  {
    id: 4,
    date: "12",
    weekDay: "Tue",
    time: "10:30am - 01:15pm",
    caption: "Weekly closed sales won checking with sales team",
    subItem: [
      { id: 1, img: avatar1 },
      { id: 2, img: avatar5 },
      { id: 3, img: avatar2 },
    ],
    imgNumber: "9",
    bgcolor: "bg-warning",
  },
];

const closingDeals = [
  {
    id: 1,
    dealName: "Acme Inc Install",
    img: avatar1,
    salesRep: "Donald Risher",
    amount: "96",
    closeDate: "Today",
  },
  {
    id: 2,
    dealName: "Save lots Stores",
    img: avatar2,
    salesRep: "Jansh Brown",
    amount: "55.7",
    closeDate: "30 Dec 2021",
  },
  {
    id: 3,
    dealName: "William PVT",
    img: avatar7,
    salesRep: "Ayaan Hudda",
    amount: "102",
    closeDate: "25 Nov 2021",
  },
  {
    id: 4,
    dealName: "Raitech Soft",
    img: avatar4,
    salesRep: "Julia William",
    amount: "89.5",
    closeDate: "20 Sep 2021",
  },
  {
    id: 5,
    dealName: "Absternet LLC",
    img: avatar4,
    salesRep: "Vitoria Rodrigues",
    amount: "89.5",
    closeDate: "20 Sep 2021",
  },
];

const todayBalanceData = [
  {
    name: "Revenue",
    data: [10, 45, 30, 35, 50, 55, 70, 120, 150, 160, 210, 240],
  },
  {
    name: "Expenses",
    data: [12, 17, 75, 82, 44, 35, 52, 75, 112, 108, 56, 289],
  },
];

const lastWeekBalanceData = [
  {
    name: "Revenue",
    data: [40, 55, 40, 35, 20, 35, 40, 70, 110, 140, 230, 210],
  },
  {
    name: "Expenses",
    data: [32, 37, 65, 22, 44, 85, 42, 75, 122, 118, 156, 199],
  },
];

const lastMonthBalanceData = [
  {
    name: "Revenue",
    data: [40, 35, 20, 65, 80, 65, 120, 90, 50, 80, 170, 150],
  },
  {
    name: "Expenses",
    data: [22, 37, 25, 62, 34, 75, 142, 145, 122, 108, 136, 199],
  },
];

const currentYearBalanceData = [
  {
    name: "Revenue",
    data: [20, 25, 30, 35, 40, 55, 70, 110, 150, 180, 210, 250],
  },
  {
    name: "Expenses",
    data: [12, 17, 45, 42, 24, 35, 42, 75, 102, 108, 156, 199],
  },
];

// Deal Type

const todayDealData = [
  {
    name: "Pending",
    data: [40, 25, 15, 20, 50, 10],
  },
  {
    name: "Loss",
    data: [40, 60, 80, 100, 40, 100],
  },
  {
    name: "Won",
    data: [22, 37, 39, 3, 23, 5],
  },
];

const weeklyDealData = [
  {
    name: "Pending",
    data: [40, 25, 30, 40, 100, 20],
  },
  {
    name: "Loss",
    data: [40, 60, 20, 40, 10, 50],
  },
  {
    name: "Won",
    data: [24, 56, 58, 43, 23, 30],
  },
];

const monthlyDealData = [
  {
    name: "Pending",
    data: [80, 50, 30, 40, 100, 20],
  },
  {
    name: "Loss",
    data: [20, 30, 40, 80, 20, 80],
  },
  {
    name: "Won",
    data: [44, 76, 78, 13, 43, 10],
  },
];

const yealyDealData = [
  {
    name: "Pending",
    data: [140, 70, 50, 60, 120, 120],
  },
  {
    name: "Loss",
    data: [70, 60, 50, 70, 60, 40],
  },
  {
    name: "Won",
    data: [14, 56, 48, 33, 63, 50],
  },
];

const octData = [
  {
    name: "Goal",
    data: [17],
  },
  {
    name: "Pending Forcast",
    data: [6],
  },
  {
    name: "Revenue",
    data: [37],
  },
];

const novData = [
  {
    name: "Goal",
    data: [37],
  },
  {
    name: "Pending Forcast",
    data: [12],
  },
  {
    name: "Revenue",
    data: [18],
  },
];

const decData = [
  {
    name: "Goal",
    data: [25],
  },
  {
    name: "Pending Forcast",
    data: [20],
  },
  {
    name: "Revenue",
    data: [27],
  },
];

const janData = [
  {
    name: "Goal",
    data: [7],
  },
  {
    name: "Pending Forcast",
    data: [5],
  },
  {
    name: "Revenue",
    data: [32],
  },
];
// Sales Forecast sample series (Forecast vs Actual for 12 months)
export const octSalesForecastData = [
  { name: "Forecast", data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58, 70] },
  { name: "Actual", data: [22, 29, 33, 36, 32, 32, 33, 23, 66, 66, 58, 63] },
];
export const novSalesForecastData = [
  { name: "Forecast", data: [38, 48, 38, 32, 42, 33, 52, 13, 46, 76, 48, 68] },
  { name: "Actual", data: [25, 19, 23, 26, 22, 22, 23, 33, 56, 56, 38, 53] },
];
export const decSalesForecastData = [
  { name: "Forecast", data: [44, 34, 44, 61, 32, 53, 43, 33, 76, 56, 68, 82] },
  { name: "Actual", data: [32, 39, 43, 46, 42, 42, 43, 23, 66, 46, 58, 73] },
];
export const janSalesForecastData = [
  { name: "Forecast", data: [52, 24, 54, 51, 22, 63, 37, 43, 56, 76, 78, 90] },
  { name: "Actual", data: [42, 29, 33, 36, 32, 32, 33, 23, 66, 66, 58, 83] },
];

export {
  crmWidgets,
  dealsStatus,
  tasks,
  activities,
  closingDeals,
  todayBalanceData,
  lastWeekBalanceData,
  lastMonthBalanceData,
  currentYearBalanceData,
  todayDealData,
  weeklyDealData,
  monthlyDealData,
  yealyDealData,
  octData,
  novData,
  decData,
  janData,
};
