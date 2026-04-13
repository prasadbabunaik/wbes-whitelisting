import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
// Use web storage in client; noop storage in server to avoid SSR errors
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// No-op storage for server or environments without window.localStorage
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

// Determine storage based on environment
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Import all reducers from the slices
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import PasswordReducer from "./auth/passwordSlice";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import CalendarReducer from "./calendar/reducer";
import chatReducer from "./chat/reducer";
import EcommerceReducer from "./ecommerce/reducer";
import ProjectsReducer from "./projects/reducer";
import TasksReducer from "./tasks/reducer";
import CryptoReducer from "./crypto/reducer";
import TicketsReducer from "./tickets/reducer";
import CrmReducer from "./crm/reducer";
import InvoiceReducer from "./invoice/reducer";
import MailboxReducer from "./mailbox/reducer";
import DashboardAnalyticsReducer from "./dashboardAnalytics/reducer";
import DashboardCRMReducer from "./dashboardCRM/reducer";
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";
import DashboardCryptoReducer from "./dashboardCrypto/reducer";
import DashboardProjectReducer from "./dashboardProject/reducer";
import DashboardNFTReducer from "./dashboardNFT/reducer";
import DashboardJobReducer from "./dashboardJob/reducer";
import TeamDataReducer from "./team/reducer";
import FileManagerReducer from "./fileManager/reducer";
import TodosReducer from "./todos/reducer";
import JobReducer from "./jobs/reducer";
import APIKeyReducer from "./apiKey/reducer";

// Root reducer type
export interface RootState {
  Layout: ReturnType<typeof LayoutReducer>;
  Login: ReturnType<typeof LoginReducer>;
  Account: ReturnType<typeof AccountReducer>;
  ForgetPassword: ReturnType<typeof ForgetPasswordReducer>;
  Profile: ReturnType<typeof ProfileReducer>;
  Calendar: ReturnType<typeof CalendarReducer>;
  Chat: ReturnType<typeof chatReducer>;
  Projects: ReturnType<typeof ProjectsReducer>;
  Ecommerce: ReturnType<typeof EcommerceReducer>;
  Tasks: ReturnType<typeof TasksReducer>;
  Crypto: ReturnType<typeof CryptoReducer>;
  Tickets: ReturnType<typeof TicketsReducer>;
  Crm: ReturnType<typeof CrmReducer>;
  Invoice: ReturnType<typeof InvoiceReducer>;
  Mailbox: ReturnType<typeof MailboxReducer>;
  DashboardAnalytics: ReturnType<typeof DashboardAnalyticsReducer>;
  DashboardCRM: ReturnType<typeof DashboardCRMReducer>;
  DashboardEcommerce: ReturnType<typeof DashboardEcommerceReducer>;
  DashboardCrypto: ReturnType<typeof DashboardCryptoReducer>;
  DashboardProject: ReturnType<typeof DashboardProjectReducer>;
  DashboardNFT: ReturnType<typeof DashboardNFTReducer>;
  DashBoardJob: ReturnType<typeof DashboardJobReducer>;
  Team: ReturnType<typeof TeamDataReducer>;
  FileManager: ReturnType<typeof FileManagerReducer>;
  Todos: ReturnType<typeof TodosReducer>;
  Jobs: ReturnType<typeof JobReducer>;
  APIKey: ReturnType<typeof APIKeyReducer>;
}

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Login", "Profile", "Layout"], // Only persist essential data
  stateReconciler: autoMergeLevel1, // Handle frozen objects properly
};

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Password: PasswordReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Calendar: CalendarReducer,
  Chat: chatReducer,
  Projects: ProjectsReducer,
  Ecommerce: EcommerceReducer,
  Tasks: TasksReducer,
  Crypto: CryptoReducer,
  Tickets: TicketsReducer,
  Crm: CrmReducer,
  Invoice: InvoiceReducer,
  Mailbox: MailboxReducer,
  DashboardAnalytics: DashboardAnalyticsReducer,
  DashboardCRM: DashboardCRMReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
  DashboardCrypto: DashboardCryptoReducer,
  DashboardProject: DashboardProjectReducer,
  DashboardNFT: DashboardNFTReducer,
  DashBoardJob: DashboardJobReducer,
  Team: TeamDataReducer,
  FileManager: FileManagerReducer,
  Todos: TodosReducer,
  Jobs: JobReducer,
  APIKey: APIKeyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
