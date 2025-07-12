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
    <Card className="bg-transparent border-white/75 hover:border-white border-2 text-white hover-lift hover:scale-105 group mx-4 md:mx-0">
      <CardContent>
        <h3 className="mb-2 text-white font-montserrat font-medium">{title}</h3>
        <p className="text-xl font-semibold text-white text-start max-w-sm break-words font-montserrat">
          {content}
        </p>
        {subcontent && (
          <p className="text-base font-normal text-white font-montserrat mt-4">
            {subcontent}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
