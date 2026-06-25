import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: ".PrismaOfertas - Admin",
    description: ".PrismaOfertas - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
