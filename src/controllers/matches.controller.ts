import { MatchBodyType, MatchResponseType, MatchNotFoundResponseType, MatchesListResType } from "@/schemaValidations/matches.schema"
import prisma from '@/database'

// Helper function for transform logic
const transformMatch = (match: any) => {
  const now = new Date();
  let infoButton = 'Preview';
  
  if (now < match.kickOff && 
      (match.homeTeam.toLowerCase() === 'manchester united' || 
       match.homeTeam.toUpperCase() === 'MAN UTD')) {
    infoButton = 'Buy Ticket';
  }
  
  return {
    ...match,
    infoButton
  };
};

export const createMatchesController = async (body: MatchBodyType): Promise<MatchResponseType> => {
  const match = await prisma.match.create({
    data: {
      homeTeam: body.homeTeam,
      awayTeam: body.awayTeam,
      kickOff: body.kickOff,
      location: body.location,
      league: body.league,
      homeLogo: body.homeLogo,
      awayLogo: body.awayLogo
    }
  });
  
  const transformedMatch = transformMatch(match);
  
  return {
    data: transformedMatch,
    message: 'Match created successfully'
  };
};


export const getMatchesController = async (): Promise<MatchesListResType> => {
  const matches = await prisma.match.findMany({
    orderBy: { kickOff: 'asc' }
  });
  
  const transformedMatches = matches.map(transformMatch);
  
  return {
    data: transformedMatches,
    message: 'Matches retrieved successfully'
  };
};

export const getMatchController = async (id: number): Promise<MatchResponseType | MatchNotFoundResponseType> => {
  const match = await prisma.match.findUnique({ where: { id } });
  
  if (!match) {
    return {
      data: null,
      message: 'Match not found'
    };
  }
  
  const transformedMatch = transformMatch(match);
  
  return {
    data: transformedMatch,
    message: 'Match retrieved successfully'
  };
};

// ✅ Thêm update controller
export const updateMatchController = async (id: number, body: MatchBodyType): Promise<MatchResponseType | MatchNotFoundResponseType> => {
  try {
    const match = await prisma.match.update({
      where: { id },
      data: body
    });
    
    const transformedMatch = transformMatch(match);
    
    return {
      data: transformedMatch,
      message: 'Match updated successfully'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Match not found or update failed'
    };
  }
};

// ✅ Thêm delete controller
export const deleteMatchController = async (id: number): Promise<{ message: string }> => {
  try {
    await prisma.match.delete({ where: { id } });
    return { message: 'Match deleted successfully' };
  } catch (error) {
    return { message: 'Match not found or delete failed' };
  }
};