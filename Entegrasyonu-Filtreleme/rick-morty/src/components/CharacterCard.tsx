import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Character } from '@/services/api';
import { Heart, MapPin, User } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  // Determine status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg group">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <Badge
            className={`${getStatusColor(
              character.status
            )} text-white font-medium`}
          >
            {character.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold line-clamp-1 mb-3">
          {character.name}
        </h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium text-foreground">Species:</span>
            <span className="ml-2 text-muted-foreground">
              {character.species}
            </span>
          </div>
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium text-foreground">Gender:</span>
            <span className="ml-2 text-muted-foreground">
              {character.gender}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium text-foreground">Origin:</span>
            <span className="ml-2 text-muted-foreground line-clamp-1">
              {character.origin.name}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <p className="text-xs text-muted-foreground flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          Last known location:{' '}
          <span className="font-medium ml-1 line-clamp-1">
            {character.location.name}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
