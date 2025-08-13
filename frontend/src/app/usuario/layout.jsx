import SideBarUsuario from "@/components/sideBarUsuario/SideBarUsuario";

export default function RootLayout({ children }) {
    return (
        <div>
            <SideBarUsuario />
            <div className="m-3">
                {children}
            </div>
        </div>

    );
}
