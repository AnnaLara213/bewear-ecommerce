import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

const CheckoutCancelPage = () => {
  return (
    <div>
      <Header />
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl">Pagamento Cancelado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              O pagamento foi cancelado. Seu pedido não foi processado.
            </p>
            <p className="text-muted-foreground text-sm">
              Você pode tentar novamente a qualquer momento.
            </p>
            <div className="space-y-2 pt-4">
              <Button asChild className="w-full">
                <Link href="/cart/confirmation">Tentar Novamente</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Voltar para a Loja</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutCancelPage;
