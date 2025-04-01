/* 
  psy21d 
  Apche 2.0 licensed
*/
import { useQuery } from "@tanstack/react-query";
import { secs } from "@/lib/utils/time";
import { getUserAchievements } from "@/api";

export function useGetUserAchievementsQuery(
  userId: string | undefined,
  authQueryKey: string | undefined,
  polling = false,
) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [useGetUserAchievementsQuery.name, userId, authQueryKey],
    queryFn: async () => {
      if (!userId) throw new Error("userId is not provided");
      if (!authQueryKey) throw new Error("auth required");

      const response = await getUserAchievements({
        path: {
          userId,
        },
      });

      if (!response) {
        throw new Error(`Failed to fetch user achievements: ${response}`);
      }

      return response;
    },
    enabled: Boolean(userId && authQueryKey),
    refetchInterval: polling ? secs(5).toMs() : undefined,
  });

  return {
    data,
    isLoading,
    refetch,
  };
}
