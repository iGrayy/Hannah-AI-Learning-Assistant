import React, { useState, useMemo } from 'react';
import { Target, Trash2, Edit2, BookOpen, ChevronDown, Plus, X, Check, FileText, ChevronRight } from 'lucide-react';

// Define types
interface Outcome {
  id: number;
  text: string;
}

interface Material {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  outcomes: Outcome[];
}

interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
  materials: Material[];
}

const OutcomesManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: 'Toán cao cấp 1',
      code: 'MATH101',
      semester: 'Kỳ 1',
      materials: [
        { 
          id: 1, 
          name: 'Bai_giang_Toan_Chuong1.pdf', 
          type: 'PDF', 
          size: '2.5 MB', 
          date: '01/09/2024',
          outcomes: [
            { id: 1, text: 'Sinh viên hiểu và vận dụng được các khái niệm về giới hạn' },
            { id: 2, text: 'Sinh viên tính được đạo hàm của các hàm số cơ bản' },
          ]
        },
        { 
          id: 2, 
          name: 'Bai_tap_Tich_phan.docx', 
          type: 'DOCX', 
          size: '1.2 MB', 
          date: '05/09/2024',
          outcomes: [
            { id: 3, text: 'Sinh viên giải được các bài toán tính tích phân cơ bản' },
            { id: 4, text: 'Sinh viên vận dụng tích phân để tính diện tích' },
          ]
        },
      ]
    },
    {
      id: 2,
      name: 'Lập trình C++',
      code: 'CS102',
      semester: 'Kỳ 1',
      materials: [
        { 
          id: 3, 
          name: 'Slide_CPP_Week1.pptx', 
          type: 'PPTX', 
          size: '3.1 MB', 
          date: '02/09/2024',
          outcomes: [
            { id: 5, text: 'Nắm vững cú pháp và cấu trúc cơ bản của C++' },
            { id: 6, text: 'Hiểu về kiểu dữ liệu và biến trong C++' },
          ]
        },
      ]
    },
    {
      id: 3,
      name: 'Vật lý đại cương',
      code: 'PHY101',
      semester: 'Kỳ 2',
      materials: []
    },
    {
      id: 4,
      name: 'Cấu trúc dữ liệu',
      code: 'CS201',
      semester: 'Kỳ 3',
      materials: []
    }
  ]);

  const semesters = ['Kỳ 1', 'Kỳ 2', 'Kỳ 3', 'Kỳ 4', 'Kỳ 5', 'Kỳ 6', 'Kỳ 7', 'Kỳ 8', 'Kỳ 9'];

  const [selectedSemester, setSelectedSemester] = useState<string>('Kỳ 1');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ text: '' });
  const [editingItem, setEditingItem] = useState<Outcome | null>(null);

  // Get courses for selected semester
  const coursesForSemester = useMemo(() => {
    return courses.filter(course => course.semester === selectedSemester);
  }, [courses, selectedSemester]);

  // Auto-select first course when semester changes
  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
    setShowSemesterDropdown(false);
    const semesterCourses = courses.filter(c => c.semester === semester);
    setSelectedCourse(semesterCourses.length > 0 ? semesterCourses[0] : null);
  };

  const handleAddOutcome = () => {
    if (!selectedCourse || !selectedMaterial) return;
    
    if (!formData.text.trim()) {
      alert('Vui lòng nhập nội dung kết quả học tập');
      return;
    }

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        const updatedMaterials = course.materials.map(material => {
          if (material.id === selectedMaterial.id) {
            if (editingItem) {
              // Update existing outcome
              return {
                ...material,
                outcomes: material.outcomes.map(outcome =>
                  outcome.id === editingItem.id ? { ...outcome, text: formData.text } : outcome
                )
              };
            } else {
              // Add new outcome
              const newOutcome: Outcome = {
                id: Date.now(),
                text: formData.text
              };
              return {
                ...material,
                outcomes: [...material.outcomes, newOutcome]
              };
            }
          }
          return material;
        });
        return { ...course, materials: updatedMaterials };
      }
      return course;
    });

    setCourses(updatedCourses);
    const updatedCourse = updatedCourses.find(c => c.id === selectedCourse.id);
    if (updatedCourse) {
      setSelectedCourse(updatedCourse);
      const updatedMaterial = updatedCourse.materials.find(m => m.id === selectedMaterial.id);
      if (updatedMaterial) {
        setSelectedMaterial(updatedMaterial);
      }
    }
    cancelForm();
  };

  const handleDeleteOutcome = (outcomeId: number) => {
    if (!selectedCourse || !selectedMaterial) return;
    
    if (window.confirm('Bạn có chắc chắn muốn xóa kết quả học tập này?')) {
      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse.id) {
          const updatedMaterials = course.materials.map(material => {
            if (material.id === selectedMaterial.id) {
              return {
                ...material,
                outcomes: material.outcomes.filter(outcome => outcome.id !== outcomeId)
              };
            }
            return material;
          });
          return { ...course, materials: updatedMaterials };
        }
        return course;
      });

      setCourses(updatedCourses);
      const updatedCourse = updatedCourses.find(c => c.id === selectedCourse.id);
      if (updatedCourse) {
        setSelectedCourse(updatedCourse);
        const updatedMaterial = updatedCourse.materials.find(m => m.id === selectedMaterial.id);
        if (updatedMaterial) {
          setSelectedMaterial(updatedMaterial);
        }
      }
    }
  };

  const handleEdit = (outcome: Outcome) => {
    setEditingItem(outcome);
    setFormData({ text: outcome.text });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setFormData({ text: '' });
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Kết quả Học tập</h1>
          <p className="text-slate-600">Quản lý kết quả học tập mong đợi cho các môn học</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="p-6">
            {/* Semester Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Chọn kỳ học
                </label>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {coursesForSemester.length} môn học
                </span>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                      {selectedSemester.replace('Kỳ ', '')}
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-slate-800 text-lg block">{selectedSemester}</span>
                      <span className="text-xs text-slate-600">Năm học 2024-2025</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${showSemesterDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showSemesterDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowSemesterDropdown(false)}
                    />
                    <div className="absolute z-20 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                      <div className="max-h-80 overflow-y-auto">
                        {semesters.map((semester, index) => (
                          <button
                            key={semester}
                            onClick={() => handleSemesterChange(semester)}
                            className={`w-full text-left px-5 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-150 border-b border-slate-100 last:border-b-0 ${
                              selectedSemester === semester 
                                ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-l-purple-600' 
                                : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm ${
                                selectedSemester === semester
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800">{semester}</div>
                                <div className="text-xs text-slate-500">
                                  {courses.filter(c => c.semester === semester).length} môn học
                                </div>
                              </div>
                              {selectedSemester === semester && (
                                <div className="ml-auto">
                                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Course Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-800">Danh sách môn học</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
              </div>
              
              {coursesForSemester.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coursesForSemester.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`group text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        selectedCourse?.id === course.id
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105'
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md hover:-translate-y-1'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedCourse?.id === course.id
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                        }`}>
                          <Target className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold mb-1 line-clamp-2 ${
                            selectedCourse?.id === course.id ? 'text-purple-900' : 'text-slate-800'
                          }`}>
                            {course.name}
                          </h4>
                          <p className="text-sm text-slate-500 font-medium">{course.code}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedCourse?.id === course.id
                              ? 'bg-purple-100'
                              : 'bg-slate-100 group-hover:bg-purple-50'
                          }`}>
                            <Target className={`w-4 h-4 ${
                              selectedCourse?.id === course.id ? 'text-purple-600' : 'text-slate-600'
                            }`} />
                          </div>
                          <span className={`font-semibold ${
                            selectedCourse?.id === course.id ? 'text-purple-700' : 'text-slate-600'
                          }`}>
                            {course.materials.length} tài liệu
                          </span>
                        </div>
                        {selectedCourse?.id === course.id && (
                          <div className="flex items-center gap-1 text-purple-600 text-xs font-semibold">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                            Đang chọn
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                  <Target className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                  <p className="text-lg font-semibold">Không có môn học nào trong kỳ này</p>
                  <p className="text-sm mt-1">Vui lòng chọn kỳ học khác</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Materials List */}
        {selectedCourse && !selectedMaterial && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 mt-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Danh sách tài liệu - {selectedCourse.name}</h2>
                <div className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
                  {selectedCourse.materials.length} tài liệu
                </div>
              </div>

              {selectedCourse.materials.length > 0 ? (
                <div className="space-y-3">
                  {selectedCourse.materials.map(material => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-purple-50 hover:border-purple-300 border-2 border-transparent transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-slate-800 group-hover:text-purple-700">{material.name}</p>
                          <p className="text-sm text-slate-500">{material.type} • {material.size} • {material.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-lg">
                          <Target className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-semibold text-purple-700">
                            {material.outcomes.length} kết quả
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                  <p className="text-lg font-semibold">Chưa có tài liệu nào cho môn học này</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Material Outcomes Detail */}
        {selectedCourse && selectedMaterial && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 mt-6">
            <div className="p-6">
              {/* Header with back button */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600 rotate-180" />
                </button>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-800">Kết quả Học tập</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    <span className="font-semibold">{selectedMaterial.name}</span> • {selectedCourse.name}
                  </p>
                </div>
              </div>

              {/* Material Info Card */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <h3 className="font-bold text-slate-800 text-lg">{selectedMaterial.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 ml-9">
                    <span>{selectedMaterial.type}</span>
                    <span>•</span>
                    <span>{selectedMaterial.size}</span>
                    <span>•</span>
                    <span>{selectedMaterial.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-purple-600">
                      {selectedMaterial.outcomes.length} kết quả
                    </span>
                  </div>
                </div>

                {/* Add Outcome Button */}
                {!showForm && !editingItem && (
                  <button 
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm Kết Quả
                  </button>
                )}
              </div>

              {/* Add/Edit Form */}
              {showForm && (
                <div className="mb-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="font-semibold text-slate-800 mb-3">
                    {editingItem ? 'Chỉnh sửa Kết quả Học tập' : 'Thêm Kết quả Học tập mới'}
                  </h3>
                  <textarea
                    placeholder="Kết quả học tập mong đợi"
                    value={formData.text}
                    onChange={(e) => setFormData({ text: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3 h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={handleAddOutcome}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                      <Check className="w-4 h-4" />
                      {editingItem ? 'Cập nhật' : 'Lưu'}
                    </button>
                    <button 
                      onClick={cancelForm}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                    >
                      <X className="w-4 h-4" />
                      Hủy
                    </button>
                  </div>
                </div>
              )}

              {/* Outcomes List */}
              {selectedMaterial.outcomes.length > 0 ? (
                <div className="space-y-2">
                  {selectedMaterial.outcomes.map((outcome, idx) => (
                    <div key={outcome.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition border border-slate-200">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <p className="flex-1 text-slate-700 mt-1">{outcome.text}</p>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleEdit(outcome)}
                          className="p-2 text-slate-600 hover:bg-slate-200 rounded transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOutcome(outcome.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                  <Target className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                  <p className="text-lg font-semibold">Chưa có Kết quả Học tập cho tài liệu này</p>
                  <p className="text-sm mt-1">Nhấn "Thêm Kết quả" để thêm kết quả học tập mới</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutcomesManagement;
