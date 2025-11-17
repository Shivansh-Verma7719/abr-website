import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";

export type Person = Tables<"people"> & {
  role?: Tables<"roles"> | null;
  team?: Tables<"teams"> | null;
};

export type Role = Tables<"roles">;
export type Team = Tables<"teams">;

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  imageUrl: string;
  description: string;
  socialLinks: Array<{
    platform: "linkedin" | "email" | "instagram" | "website" | "twitter";
    url: string;
  }>;
}

export interface TeamDepartment {
  id: string;
  name: string;
  description: string;
  color: string;
  members: TeamMember[];
}

// Fetch all people with their roles and teams
export async function getPeople(): Promise<Person[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("people")
    .select(
      `
      *,
      role:roles(*),
      team:teams(*)
    `
    )
    .eq("is_active", true)
    .order("team_id", { ascending: true, nullsFirst: false })
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching people:", error);
    return [];
  }

  return data || [];
}

// Fetch all teams
export async function getTeams(): Promise<Team[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("display_order", { ascending: true })
    .order("name");

  if (error) {
    console.error("Error fetching teams:", error);
    return [];
  }

  return data || [];
}

// Transform database people to TeamMember format
function transformPersonToTeamMember(person: Person): TeamMember {
  const socialLinks: TeamMember["socialLinks"] = [];

  if (person.linkedin) {
    socialLinks.push({ platform: "linkedin", url: person.linkedin });
  }
  if (person.email) {
    socialLinks.push({ platform: "email", url: person.email });
  }
  if (person.instagram) {
    socialLinks.push({ platform: "instagram", url: person.instagram });
  }
  if (person.twitter) {
    socialLinks.push({ platform: "twitter", url: person.twitter });
  }

  return {
    id: person.id,
    name: person.full_name || "Unknown",
    position: person.role?.name || "Member",
    department: person.team?.name || "General",
    imageUrl:
      person.profile_image ||
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces",
    description: "", // Add description field to database if needed
    socialLinks,
  };
}

// Get team departments with members
export async function getTeamDepartments(): Promise<TeamDepartment[]> {
  const people = await getPeople();
  const teams = await getTeams();

  // Color schemes for different teams
  const teamColors: Record<string, string> = {
    Editorial: "from-blue-600 to-purple-600",
    Content: "from-purple-600 to-pink-600",
    Design: "from-pink-600 to-red-600",
    Digital: "from-red-600 to-orange-600",
    Marketing: "from-orange-600 to-yellow-600",
    Operations: "from-green-600 to-teal-600",
  };

  // Create departments from teams
  const departments: TeamDepartment[] = teams.map((team, index) => {
    const teamMembers = people
      .filter((person) => person.team_id === team.id)
      .map(transformPersonToTeamMember);

    return {
      id: team.id.toString(),
      name: team.name || "Team",
      description: `Our ${team.name} team`,
      color:
        teamColors[team.name || ""] ||
        `from-blue-${(index + 4) * 100} to-purple-${(index + 4) * 100}`,
      members: teamMembers,
    };
  });

  return departments.filter((dept) => dept.members.length > 0);
}
