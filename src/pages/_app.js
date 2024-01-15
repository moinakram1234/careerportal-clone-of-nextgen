import { SidebarProvider } from "@/context/SidebarContext";
import { Provider } from 'react-redux';
import store from "@/Redux_Store/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
   < Provider store={store}>
     <SidebarProvider>
     <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      </SessionProvider>
    </SidebarProvider>
   </Provider>
  );
}
