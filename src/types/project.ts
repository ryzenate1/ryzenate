export interface Project {
  title: string;
  imageUrl: string;
  link?: string; // Optional link for ProjectCard
  tech: string[]; // Added based on ExpandedProjectView usage
  description: string; // Added based on ExpandedProjectView usage
  liveUrl?: string; // Added based on ExpandedProjectView usage
  repoUrl?: string; // Added based on ExpandedProjectView usage
}