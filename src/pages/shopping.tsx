import AppLayout from "@/components/app-layout";
import Header from "@/components/header";

export default function ShoppingPage() {
  return (
    <AppLayout>
      <div className="space-y-5">
        <Header text="Go shopping !" />
      </div>
    </AppLayout>
  );
}