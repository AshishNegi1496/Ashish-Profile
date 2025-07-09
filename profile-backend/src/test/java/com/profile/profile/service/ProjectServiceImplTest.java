package com.profile.profile.service;

import com.profile.profile.dto.ProjectDTO;
import com.profile.profile.entity.Project;
import com.profile.profile.entity.Skill;
import com.profile.profile.repository.ProjectRepository;
import com.profile.profile.repository.SkillRepository;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProject_shouldSaveAndReturnProjectDTO() {
        // Arrange
        ProjectDTO dto = new ProjectDTO();
        dto.setTitle("Test Project");
        dto.setDescription("Description");
        dto.setStartDate(LocalDate.now());
        dto.setEndDate(LocalDate.now().plusDays(1));
        dto.setHighlights("Highlights");
        dto.setImageUrl("http://img.url");
        dto.setSkills(Set.of("Java", "New Skill", "Spring"));

        Skill javaSkill = new Skill();
        javaSkill.setId(1L);
        javaSkill.setName("Java");

        Skill springSkill = new Skill();
        springSkill.setId(2L);
        springSkill.setName("Spring");

        when(skillRepository.findByNameIgnoreCase("Java")).thenReturn(Optional.of(javaSkill));
        when(skillRepository.findByNameIgnoreCase("Spring")).thenReturn(Optional.of(springSkill));

        Project savedProject = new Project();
        savedProject.setId(10L);
        savedProject.setTitle(dto.getTitle());
        savedProject.setDescription(dto.getDescription());
        savedProject.setStartDate(dto.getStartDate());
        savedProject.setEndDate(dto.getEndDate());
        savedProject.setHighlights(dto.getHighlights());
        savedProject.setImageUrl(dto.getImageUrl());
        savedProject.setSkills(Set.of(javaSkill, springSkill));

        when(projectRepository.save(any(Project.class))).thenReturn(savedProject);

        // Act
        ProjectDTO result = projectService.createProject(dto);

        // Assert
        assertThat(result.getId()).isEqualTo(10L);
        assertThat(result.getTitle()).isEqualTo("Test Project");
        assertThat(result.getSkills()).containsExactlyInAnyOrder("Java", "Spring");
    }

    @Test
    void updateProject_shouldUpdateAndReturnProjectDTO() {
        // Arrange
        long id = 1L;
        Project existing = new Project();
        existing.setId(id);
        existing.setTitle("Old Title");
        existing.setSkills(new HashSet<>());

        ProjectDTO dto = new ProjectDTO();
        dto.setTitle("New Title");
        dto.setDescription("New Desc");
        dto.setStartDate(LocalDate.now());
        dto.setEndDate(LocalDate.now().plusDays(1));
        dto.setHighlights("Highlights");
        dto.setImageUrl("http://img.url");
        dto.setSkills(Set.of("Java"));

        Skill javaSkill = new Skill("Java");
        javaSkill.setId(1L);

        when(projectRepository.findById(id)).thenReturn(Optional.of(existing));
        when(skillRepository.findByNameIgnoreCase("Java")).thenReturn(Optional.of(javaSkill));
        when(projectRepository.save(any(Project.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        ProjectDTO result = projectService.updateProject(id, dto);

        // Assert
        assertThat(result.getTitle()).isEqualTo("New Title");
        assertThat(result.getSkills()).contains("Java");
    }

    @Test
    void getProjectEntityById_shouldReturnProject_whenExists() {
        Project project = new Project();
        project.setId(1L);
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Project result = projectService.getProjectEntityById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
    }

    @Test
    void getProjectEntityById_shouldThrow_whenNotFound() {
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> projectService.getProjectEntityById(1L));
    }

    @Test
    void getAllProjects_shouldReturnListOfProjectDTO() {
        Project project = new Project();
        project.setId(1L);
        project.setTitle("P1");
        project.setSkills(new HashSet<>());

        when(projectRepository.findAll()).thenReturn(List.of(project));

        List<ProjectDTO> result = projectService.getAllProjects();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("P1");
    }

    @Test
    void deleteProject_shouldDelete_whenExists() {
        when(projectRepository.existsById(1L)).thenReturn(true);

        projectService.deleteProject(1L);

        verify(projectRepository).deleteById(1L);
    }

    @Test
    void deleteProject_shouldThrow_whenNotExists() {
        when(projectRepository.existsById(1L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> projectService.deleteProject(1L));
    }
}
