import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

const prisma = new PrismaClient();

async function getBishopCharge() {
  try {
    const charge = await prisma.bishopCharge.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return charge;
  } catch (error) {
    console.error("Error fetching bishop's charge:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const charge = await getBishopCharge();
  
  return {
    title: charge ? `${charge.title} - Diocese of Idoani` : "Bishop's Charge - Diocese of Idoani",
    description: charge 
      ? `${charge.content.substring(0, 160)}...`
      : "Read the latest pastoral message from the Bishop of Idoani Diocese",
    keywords: ["bishop", "pastoral letter", "anglican", "idoani", "diocese", "charge"],
    openGraph: {
      title: charge ? charge.title : "Bishop's Charge",
      description: charge 
        ? `${charge.content.substring(0, 160)}...`
        : "Latest pastoral message from the Bishop",
      type: "article",
    },
  };
}

export default async function BishopChargePage() {
  const charge = await getBishopCharge();

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Bishop's Charge
          </h1>
          <p className="text-xl text-indigo-100">
            Pastoral messages and guidance from the Bishop of Idoani
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {charge ? (
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="border-b border-gray-100 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl lg:text-3xl font-serif text-gray-900 mb-4">
                      {charge.title}
                    </CardTitle>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Published {formatDate(charge.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
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
              
              <CardContent className="pt-8">
                <div className="prose prose-lg prose-indigo max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-8 first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4 mt-8">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3 mt-6">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                          {children}
                        </p>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-indigo-200 pl-6 py-2 my-6 bg-indigo-50 italic text-gray-700">
                          {children}
                        </blockquote>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-gray-800">{children}</em>
                      ),
                    }}
                  >
                    {charge.content}
                  </ReactMarkdown>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-gray-600 italic">
                      May God's peace be with you always.
                    </p>
                    <p className="text-gray-800 font-semibold mt-2">
                      + The Right Reverend Bishop of Idoani
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                No Current Bishop's Charge
              </h2>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                There is currently no active pastoral message from the Bishop. 
                Please check back soon for updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
