import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BlankContentProps {
  title: string
  description?: string
}

export function BlankContent({ title, description }: BlankContentProps) {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-sm">
              {description ||
                `${title} content will be displayed here. Add your components and features for this section.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
