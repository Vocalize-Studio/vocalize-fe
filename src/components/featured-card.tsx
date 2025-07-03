import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedCard({
  title,
  content,
  subcontent,
}: {
  title: string;
  content: string;
  subcontent?: string;
}) {
  return (
    <Card className="bg-transparent border-white/75 hover:border-white border-2 text-white hover-lift hover:scale-105 group">
      <CardContent>
        <h3 className="font-semibold mb-2 text-white">{title}</h3>
        <p className="text-xl font-semibold text-white text-start max-w-sm break-words">
          {content}
        </p>
        {subcontent && (
          <p className="text-sm font-normal text-white">{subcontent}</p>
        )}
      </CardContent>
    </Card>
  );
}
