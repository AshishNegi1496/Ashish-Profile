package com.profile.profile.service;

import com.profile.profile.dto.ProjectDTO;
import com.profile.profile.entity.Project;

import java.util.List;

public interface ProjectService {
    ProjectDTO createProject(ProjectDTO dto);
    ProjectDTO updateProject(Long id, ProjectDTO dto);
    Project getProjectEntityById(Long id);

    Project saveProjectEntity(Project project);;
    List<ProjectDTO> getAllProjects();
    void deleteProject(Long id);
}