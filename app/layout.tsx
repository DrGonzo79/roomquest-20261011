import type {Metadata} from "next";
import "./globals.css";
export const metadata: Metadata = {title:"RoomQuest — personalized gift-game studio",description:"A transparent, deterministic prototype for planning a home-photo escape-room gift."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
