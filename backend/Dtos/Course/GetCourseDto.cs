using System;
using System.Collections.Generic;
using backend.Dtos.Section;
using backend.Models;

namespace backend.Dtos.Course
{
    public class GetCourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public SemesterType CourseSemester { get; set; }
        public int Year { get; set; }
        public string CourseInformation { get; set; }
        public int NumberOfSections { get; set; }
        public bool IsSectionless { get; set; } = false;
        public DateTime LockDate { get; set; }
        public DateTime StartDate { get; set; }
        public int MinGroupSize { get; set; }
        public int MaxGroupSize { get; set; }
        public ICollection<GetSectionOfCourseDto> Sections { get; set; }
        public ICollection<InstructorInCourseDto> Instructors { get; set; }
        public decimal SrsGrade { get; set; }
        public bool IsActive {get; set;}
    }
}