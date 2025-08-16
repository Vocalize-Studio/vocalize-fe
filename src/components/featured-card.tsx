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
    <Card className="bg-transparent border-2 border-white/75 hover:border-white text-white hover-lift hover:scale-105 mx-4 md:mx-0">
      <CardContent className="flex flex-col items-start text-left">
        <h3 className="mb-3 font-montserrat font-medium text-white">{title}</h3>
        <p className="font-montserrat font-semibold text-xl leading-snug min-h-[3.25rem]">
          {content}
        </p>
        {subcontent && (
          <p className="mt-auto pt-4 font-montserrat text-base text-white/90">
            {subcontent}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
