using System.Collections.Generic;
using backend.Dtos.ProjectGroup;

namespace backend.Dtos.Section
{
    public class GetSectionDto
    {
        public int Id { get; set; }
        public int SectionNo { get; set; }
        public ICollection<GetProjectGroupDto> ProjectGroups { get; set; }
        public CourseInSectionDto AffiliatedCourse { get; set; }
        public int AffiliatedCourseId { get; set; }
    }
}