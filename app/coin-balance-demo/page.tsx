import { CoinBalance } from "@/components/atoms/coin-balance"

export default function CoinBalanceDemo() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Componente CoinBalance</h1>
          <p className="text-slate-600">Demonstração do componente CoinBalance em diferentes tamanhos e contextos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Tamanho pequeno</h2>
            <CoinBalance amount={128} size="sm" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Tamanho médio (padrão)</h2>
            <CoinBalance amount={1250} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Tamanho grande</h2>
            <CoinBalance amount={9876} size="lg" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Exemplos de uso</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Cabeçalho de dashboard</h3>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Bem-vindo de volta</h4>
                  <p className="text-xl font-bold text-slate-900">João Silva</p>
                </div>
                <CoinBalance amount={3450} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Página de compra</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-slate-700">Saldo atual</p>
                  <CoinBalance amount={750} size="sm" showTooltip={false} />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-700">Custo do lead</p>
                  <p className="font-medium text-slate-900">50 Coins</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <p className="font-medium text-slate-900">Saldo após compra</p>
                  <p className="font-medium text-slate-900">700 Coins</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Versão com valor alto</h2>
          <div className="flex flex-wrap gap-4">
            <CoinBalance amount={1000000} tooltipContent="Saldo disponível para compra de leads premium" />
            <CoinBalance
              amount={0}
              tooltipContent="Você não possui saldo disponível"
              className="border-red-100 bg-red-50"
            />
            <CoinBalance
              amount={50}
              tooltipContent="Saldo baixo, considere recarregar"
              className="border-yellow-100 bg-yellow-50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
