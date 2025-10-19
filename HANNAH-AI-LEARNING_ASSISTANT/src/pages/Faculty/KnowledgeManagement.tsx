import { useState } from 'react';
import { Upload, File, Trash2, Edit2, Plus, X, Check, FileText, AlertCircle, BookOpen, ChevronDown } from 'lucide-react';


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
      ],
      outcomes: [
        { id: 1, text: 'Understand fundamental programming concepts' },
        { id: 2, text: 'Apply problem-solving techniques to real-world scenarios' }
      ],
      challenges: [
        { id: 1, text: 'Difficulty understanding recursion' },
        { id: 2, text: 'Time management with assignments' }
      ]
    },
    { 
      id: 2, 
      name: 'Database Systems', 
      code: 'DBI202',
      semester: 'Fall 2024',
      materials: [],
      outcomes: [],
      challenges: []
    }
  ]);


  const [faqs, setFaqs] = useState([
    { id: 1, question: 'What are the grading criteria?', answer: 'The grading includes 40% midterm, 40% final exam, and 20% assignments.', courseId: 1 },
    { id: 2, question: 'How do I submit assignments?', answer: 'Submit through the online portal before the deadline.', courseId: 1 }
  ]);


  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ question: '', answer: '', text: '' });
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', code: '', semester: '' });


  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code && newCourse.semester) {
      const course = {
        id: Date.now(),
        name: newCourse.name,
        code: newCourse.code,
        semester: newCourse.semester,
        materials: [],
        outcomes: [],
        challenges: []
      };
      setCourses([...courses, course]);
      setSelectedCourse(course);
      setNewCourse({ name: '', code: '', semester: '' });
      setShowAddCourse(false);
    }
  };


  const handleAddFAQ = () => {
    if (formData.question && formData.answer) {
      if (editingItem) {
        setFaqs(faqs.map(f => f.id === editingItem.id 
          ? { ...f, question: formData.question, answer: formData.answer }
          : f
        ));
      } else {
        setFaqs([...faqs, { 
          id: Date.now(), 
          question: formData.question, 
          answer: formData.answer,
          courseId: selectedCourse.id
        }]);
      }
      setFormData({ question: '', answer: '', text: '' });
      setActiveForm(null);
      setEditingItem(null);
    }
  };


  const handleAddOutcome = () => {
    if (formData.text) {
      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse.id) {
          if (editingItem) {
            return {
              ...course,
              outcomes: course.outcomes.map(o => o.id === editingItem.id 
                ? { ...o, text: formData.text }
                : o
              )
            };
          } else {
            return {
              ...course,
              outcomes: [...course.outcomes, { id: Date.now(), text: formData.text }]
            };
          }
        }
        return course;
      });
      setCourses(updatedCourses);
      const updated = updatedCourses.find(c => c.id === selectedCourse.id);
      if (updated) setSelectedCourse(updated);
      setFormData({ question: '', answer: '', text: '' });
      setActiveForm(null);
      setEditingItem(null);
    }
  };


  const handleAddChallenge = () => {
    if (formData.text) {
      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse.id) {
          if (editingItem) {
            return {
              ...course,
              challenges: course.challenges.map(c => c.id === editingItem.id 
                ? { ...c, text: formData.text }
                : c
              )
            };
          } else {
            return {
              ...course,
              challenges: [...course.challenges, { id: Date.now(), text: formData.text }]
            };
          }
        }
        return course;
      });
      setCourses(updatedCourses);
      const updated = updatedCourses.find(c => c.id === selectedCourse.id);
      if (updated) setSelectedCourse(updated);
      setFormData({ question: '', answer: '', text: '' });
      setActiveForm(null);
      setEditingItem(null);
    }
  };


  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    if (type === 'faq') {
      setFormData({ question: item.question, answer: item.answer, text: '' });
      setActiveForm('faq');
    } else {
      setFormData({ question: '', answer: '', text: item.text });
      setActiveForm(type);
    }
  };


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


  const handleDeleteOutcome = (id: number) => {
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          outcomes: course.outcomes.filter(o => o.id !== id)
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    const updated = updatedCourses.find(c => c.id === selectedCourse.id);
    if (updated) setSelectedCourse(updated);
  };


  const handleDeleteChallenge = (id: number) => {
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          challenges: course.challenges.filter(c => c.id !== id)
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    const updated = updatedCourses.find(c => c.id === selectedCourse.id);
    if (updated) setSelectedCourse(updated);
  };


  const cancelForm = () => {
    setActiveForm(null);
    setEditingItem(null);
    setFormData({ question: '', answer: '', text: '' });
  };


  const courseFaqs = faqs.filter(f => f.courseId === selectedCourse.id);


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
            <button
              onClick={() => setShowAddCourse(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Thêm môn học
            </button>
          </div>


          {showAddCourse && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-slate-800 mb-3">Thêm môn học mới</h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Tên môn học"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Mã môn (VD: SWE201)"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Học kỳ (VD: Fall 2024)"
                  value={newCourse.semester}
                  onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleAddCourse}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Check className="w-4 h-4" />
                  Lưu
                </button>
                <button 
                  onClick={() => {
                    setShowAddCourse(false);
                    setNewCourse({ name: '', code: '', semester: '' });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                >
                  <X className="w-4 h-4" />
                  Hủy
                </button>
              </div>
            </div>
          )}
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


        {/* FAQ Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">FAQ - {selectedCourse.name}</h2>
            <button 
              onClick={() => setActiveForm('faq')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              Thêm FAQ
            </button>
          </div>


          {activeForm === 'faq' && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold text-slate-800 mb-3">
                {editingItem ? 'Chỉnh sửa FAQ' : 'Thêm FAQ mới'}
              </h3>
              <input
                type="text"
                placeholder="Câu hỏi"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Câu trả lời"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3 h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <button 
                  onClick={handleAddFAQ}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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


          {courseFaqs.length > 0 ? (
            <div className="space-y-3">
              {courseFaqs.map(faq => (
                <div key={faq.id} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-slate-800 flex-1">{faq.question}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(faq, 'faq')}
                        className="p-1 text-slate-600 hover:bg-slate-200 rounded transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>Chưa có FAQ nào cho môn học này</p>
            </div>
          )}
        </div>


        <div className="grid md:grid-cols-2 gap-6">
          {/* Learning Outcomes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Kết quả Học tập</h2>
              <button 
                onClick={() => setActiveForm('outcome')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
                Thêm
              </button>
            </div>


            {activeForm === 'outcome' && (
              <div className="mb-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <textarea
                  placeholder="Kết quả học tập mong đợi"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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


            {selectedCourse.outcomes.length > 0 ? (
              <div className="space-y-2">
                {selectedCourse.outcomes.map((outcome, idx) => (
                  <div key={outcome.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <p className="flex-1 text-slate-700">{outcome.text}</p>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(outcome, 'outcome')}
                        className="p-1 text-slate-600 hover:bg-slate-200 rounded transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteOutcome(outcome.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>Chưa có Kết quả Học tập cho môn này</p>
              </div>
            )}
          </div>


          {/* Common Challenges */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                Thách thức Thường gặp
              </h2>
              <button 
                onClick={() => setActiveForm('challenge')}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                <Plus className="w-5 h-5" />
                Thêm
              </button>
            </div>


            {activeForm === 'challenge' && (
              <div className="mb-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <textarea
                  placeholder="Thách thức phổ biến của sinh viên"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3 h-20 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddChallenge}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
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


            {selectedCourse.challenges.length > 0 ? (
              <div className="space-y-2">
                {selectedCourse.challenges.map(challenge => (
                  <div key={challenge.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="flex-1 text-slate-700">{challenge.text}</p>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(challenge, 'challenge')}
                        className="p-1 text-slate-600 hover:bg-slate-200 rounded transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteChallenge(challenge.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>Chưa có Thách thức Thường gặp cho môn này</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}