import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AccessDeniedProps {
  title?: string;
  description?: string;
  onGoBack?: () => void;
  onContactSupport?: () => void;
}

export default function AccessDenied({
  title = "Access Denied",
  description = "You don't have permission to view this page or resource. Please contact your administrator if you believe this is a mistake.",
  onGoBack,
  onContactSupport,
}: AccessDeniedProps) {
  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-destructive/20">
        <CardHeader className="flex flex-col items-center space-y-3 pb-2">
          {/* Visual Icon Badge */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-8 w-8" />
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border text-muted-foreground shadow-sm">
              <Lock className="h-3 w-3" />
            </div>
          </div>
          
          <CardTitle className="text-xl font-semibold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-2 pb-4">
          <p className="text-xs text-muted-foreground bg-muted/50 py-2 px-3 rounded-md border border-border/50">
            Error Code: 403 Forbidden
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBack} 
            className="w-full sm:w-auto gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          {onContactSupport && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={onContactSupport} 
              className="w-full sm:w-auto"
            >
              Contact Admin
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}