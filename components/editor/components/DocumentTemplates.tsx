"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Heart, Users, BookOpen, Star } from 'lucide-react';

interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
}

interface DocumentTemplatesProps {
  onSelectTemplate: (content: string) => void;
  children: React.ReactNode;
}

const templates: DocumentTemplate[] = [
  {
    id: 'pastoral-letter',
    title: 'Pastoral Letter',
    description: 'General pastoral message to the diocese',
    icon: <Heart className="h-6 w-6 text-red-500" />,
    content: `<h1>Pastoral Letter</h1>
<p><strong>To the Clergy and Faithful of the Anglican Diocese of Idoani</strong></p>
<p><em>Grace and peace to you in the name of our Lord Jesus Christ.</em></p>

<p>Dear Brothers and Sisters in Christ,</p>

<p>[Your pastoral message begins here...]</p>

<p>May the Lord bless you and keep you.</p>

<p>In Christ's service,<br>
+[Bishop's Name]<br>
Bishop of Idoani</p>`
  },
  {
    id: 'episcopal-charge',
    title: 'Episcopal Charge',
    description: 'Formal charge to clergy and diocesan synod',
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    content: `<h1>Episcopal Charge to the Diocesan Synod</h1>
<p><strong>Anglican Diocese of Idoani</strong></p>
<p><em>[Date and Venue]</em></p>

<h2>Introduction</h2>
<p>Reverend Fathers, Mothers in Christ, and beloved members of our diocesan family,</p>

<p>[Your charge begins here...]</p>

<h2>The State of Our Diocese</h2>
<p>[Discuss the current state of the diocese...]</p>

<h2>Our Vision Moving Forward</h2>
<p>[Outline the vision and direction...]</p>

<h2>Conclusion</h2>
<p>[Concluding remarks and blessing...]</p>

<p>Given under my hand and episcopal seal this [date].</p>

<p>+[Bishop's Name]<br>
Bishop of Idoani</p>`
  },
  {
    id: 'seasonal-message',
    title: 'Seasonal Message',
    description: 'Special message for liturgical seasons',
    icon: <Calendar className="h-6 w-6 text-green-500" />,
    content: `<h1>[Season] Message</h1>
<p><strong>Anglican Diocese of Idoani</strong></p>

<p>Dear People of God,</p>

<p>As we enter this holy season of [Season Name], I write to you with joy and anticipation...</p>

<p>[Your seasonal message...]</p>

<h2>Liturgical Observances</h2>
<p>[Special services and observances...]</p>

<h2>Prayer and Reflection</h2>
<p>[Spiritual guidance for the season...]</p>

<p>May this [season] be a time of spiritual renewal and growth for all of us.</p>

<p>Yours in Christ,<br>
+[Bishop's Name]<br>
Bishop of Idoani</p>`
  },
  {
    id: 'ordination-charge',
    title: 'Ordination Charge',
    description: 'Charge to newly ordained clergy',
    icon: <Users className="h-6 w-6 text-purple-500" />,
    content: `<h1>Charge to the Newly Ordained</h1>
<p><strong>Service of Ordination</strong><br>
<em>[Date and Venue]</em></p>

<p>My dear brothers and sisters in Christ, newly called to serve in Holy Orders,</p>

<p>[Your charge to the ordinands...]</p>

<h2>The Sacred Trust</h2>
<p>[Discuss the responsibilities of ordained ministry...]</p>

<h2>Pastoral Care</h2>
<p>[Guidelines for pastoral ministry...]</p>

<h2>Continuing Formation</h2>
<p>[Importance of ongoing learning and growth...]</p>

<p>May God grant you wisdom, courage, and faithfulness in your ministry.</p>

<p>+[Bishop's Name]<br>
Bishop of Idoani</p>`
  },
  {
    id: 'special-announcement',
    title: 'Special Announcement',
    description: 'Important diocesan announcements',
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    content: `<h1>Important Diocesan Announcement</h1>
<p><strong>Anglican Diocese of Idoani</strong></p>
<p><em>[Date]</em></p>

<p>To all Clergy, Churchwardens, and Members of the Diocese,</p>

<p>[Your announcement...]</p>

<h2>Details</h2>
<p>[Specific information and details...]</p>

<h2>Action Required</h2>
<p>[Any actions needed from recipients...]</p>

<p>Thank you for your attention to this matter.</p>

<p>In Christ's service,<br>
+[Bishop's Name]<br>
Bishop of Idoani</p>`
  },
  {
    id: 'blank',
    title: 'Blank Document',
    description: 'Start with a completely blank document',
    icon: <FileText className="h-6 w-6 text-gray-500" />,
    content: '<p></p>'
  }
];

export const DocumentTemplates: React.FC<DocumentTemplatesProps> = ({ 
  onSelectTemplate, 
  children 
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelectTemplate = (template: DocumentTemplate) => {
    onSelectTemplate(template.content);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Choose a Document Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-purple-200"
              onClick={() => handleSelectTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {template.icon}
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTemplate(template);
                  }}
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
