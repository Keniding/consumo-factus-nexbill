'use client'

import { BarChart3, FileText, Settings, ArrowRight } from 'lucide-react'
import { ElegantCard } from '@/src/app/components/ui/ElegantCard'
import { ElegantButton } from '@/src/app/components/ui/ElegantButton'
import { useRouter } from "next/navigation"

const features = [
  {
    icon: <FileText className="h-6 w-6 text-brand-primary animate-float" />,
    title: "Facturación Inteligente",
    description: "Automatiza tu proceso de facturación con plantillas personalizables y gestión avanzada de documentos. Simplifica tus operaciones diarias."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-brand-accent animate-float" />,
    title: "Análisis Detallado",
    description: "Obtén insights valiosos con reportes personalizados y visualización de datos en tiempo real."
  },
  {
    icon: <Settings className="h-6 w-6 text-brand-success animate-float" />,
    title: "Gestión Simplificada",
    description: "Administra tu negocio con herramientas intuitivas y flujos de trabajo optimizados para máxima eficiencia."
  }
]

export default function HomePage() {
  const router = useRouter()

  const handleStartTrial = () => {
    router.push('/login')
  }

  const handleScheduleDemo = () => {
    router.push('/contact')
  }

  return (
      <div className="min-h-screen bg-brand-surface overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div
              className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 animate-pulse-soft"/>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                NexBill
              </h1>
            </div>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mt-4">
              Sistema de facturación inteligente diseñado para impulsar
              la eficiencia de tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className={`transition-all duration-500 delay-${index * 200} h-full`}
                >
                  <ElegantCard
                      variant="elevated"
                      className="transform transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="flex flex-col items-center text-center group h-full">
                      {/* Contenedor superior para el ícono */}
                      <div className="mb-4">
                        <div
                            className="p-3 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-full transform transition-transform group-hover:scale-110">
                          {feature.icon}
                        </div>
                      </div>

                      {/* Contenedor para el contenido de texto */}
                      <div className="flex flex-col flex-grow justify-between">
                        <h3 className="text-xl font-semibold mb-3 text-brand-dark">
                          {feature.title}
                        </h3>
                        <p className="text-text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </ElegantCard>
                </div>
            ))}
          </div>

          <div className="text-center mt-16 space-x-4">
            <ElegantButton
                variant="primary"
                size="lg"
                className="group"
                onClick={handleStartTrial}
            >
          <span className="flex items-center">
            Comenzar Prueba Gratuita
            <ArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1"/>
          </span>
            </ElegantButton>

            <ElegantButton
                variant="outline"
                size="lg"
                className="group"
                onClick={handleScheduleDemo}
            >
          <span className="flex items-center">
            Agendar Demo
            <span className="ml-2 animate-wave">👋</span>
          </span>
            </ElegantButton>
          </div>
        </div>
      </div>
  )
}