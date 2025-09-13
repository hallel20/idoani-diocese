import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { BishopCharge } from "@prisma/client";

interface BishopChargeSectionProps {
  charge: BishopCharge | null;
}

export default function BishopChargeSection({ charge }: BishopChargeSectionProps) {
  if (!charge) {
    return null;
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const excerpt = charge.content.length > 200 
    ? charge.content.substring(0, 200) + "..." 
    : charge.content;

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Bishop's Charge
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read the latest pastoral message from our Bishop
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-serif text-gray-900 mb-3">
                  {charge.title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Published {formatDate(charge.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Bishop of Idoani</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-indigo-100 text-indigo-800 ml-4">
                <FileText className="w-3 h-3 mr-1" />
                Pastoral Letter
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {excerpt.replace(/[#*_`]/g, '')} {/* Remove basic markdown formatting for excerpt */}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                A message of guidance and encouragement from our Bishop
              </div>
              <Link href="/bishops-charge">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Read Full Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
