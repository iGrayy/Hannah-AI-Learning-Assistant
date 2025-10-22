import { useState } from 'react';
import { Upload, File, Trash2, Edit2, FileText, BookOpen, ChevronDown } from 'lucide-react';


export default function KnowledgeManagement() {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'Software Engineering', 
      code: 'SWE201',
      semester: 'Fall 2024',
      materials: [
        { id: 1, name: 'Syllabus.pdf', type: 'PDF', size: '2.4 MB', date: '2024-10-15' },
        { id: 2, name: 'Lecture_01.pptx', type: 'PPTX', size: '5.1 MB', date: '2024-10-14' }
      ]
    },
    { 
      id: 2, 
      name: 'Database Systems', 
      code: 'DBI202',
      semester: 'Fall 2024',
      materials: []
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const handleDeleteMaterial = (id: number) => {
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          materials: course.materials.filter(m => m.id !== id)
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    const updated = updatedCourses.find(c => c.id === selectedCourse.id);
    if (updated) setSelectedCourse(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Quản lý tài liệu</h1>
          <p className="text-slate-600">Quản lý tài liệu và nội dung theo môn học</p>
        </div>


        {/* Course Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div className="relative flex-1 max-w-md">
                <button
                  onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition border-2 border-slate-200"
                >
                  <div className="text-left">
                    <p className="font-bold text-slate-800">{selectedCourse.name}</p>
                    <p className="text-sm text-slate-600">{selectedCourse.code} - {selectedCourse.semester}</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-600" />
                </button>
                
                {showCourseDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border-2 border-slate-200 z-10 max-h-64 overflow-y-auto">
                    {courses.map(course => (
                      <button
                        key={course.id}
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowCourseDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition ${
                          course.id === selectedCourse.id ? 'bg-blue-100' : ''
                        }`}
                      >
                        <p className="font-semibold text-slate-800">{course.name}</p>
                        <p className="text-sm text-slate-600">{course.code} - {course.semester}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Materials Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Tài liệu - {selectedCourse.name}
            </h2>
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition">
              <Upload className="w-5 h-5" />
              Tải lên File
              <input type="file" className="hidden" multiple />
            </label>
          </div>


          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-6 hover:border-blue-400 transition">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-2">Kéo thả file vào đây hoặc click để chọn</p>
            <p className="text-sm text-slate-500">Hỗ trợ: PDF, DOCX, PPTX, TXT (Max: 50MB)</p>
          </div>


          {selectedCourse.materials.length > 0 ? (
            <div className="space-y-3">
              {selectedCourse.materials.map(mat => (
                <div key={mat.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-800">{mat.name}</p>
                      <p className="text-sm text-slate-500">{mat.type} • {mat.size} • {mat.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMaterial(mat.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p>Chưa có tài liệu nào cho môn học này</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}