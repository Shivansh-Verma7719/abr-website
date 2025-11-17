import { getTeamDepartments } from './helpers';
import TeamPageWrapper from './TeamPageWrapper';

export default async function TeamPage() {
    // Fetch team departments from Supabase
    const departments = await getTeamDepartments();

    // Manual filtering of department for now (remove editors and guest team)
    const filteredDepartments = departments.filter(dept => dept.name !== "Editors" && dept.name !== "Guest");

    return <TeamPageWrapper departments={filteredDepartments} />;
}
