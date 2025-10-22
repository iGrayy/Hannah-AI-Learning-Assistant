import React, { useState, useMemo } from 'react';
import { AlertCircle, Plus, Edit2, Trash2, Save, X, FileText, ChevronRight } from 'lucide-react';

interface Challenge {
    id: number;
    title: string;
    description: string;
    solution: string;
    frequency: 'Cao' | 'Trung bình' | 'Thấp';
}

interface Material {
    id: number;
    name: string;
    type: string;
    size: string;
    date: string;
    challenges: Challenge[];
}

interface Course {
    id: number;
    name: string;
    code: string;
    semester: string;
    materials: Material[];
}

const ChallengesManagement: React.FC = () => {
    const [selectedSemester, setSelectedSemester] = useState<string>('Kỳ 1');
    const [showSemesterDropdown, setShowSemesterDropdown] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newChallenge, setNewChallenge] = useState<Omit<Challenge, 'id'>>({
        title: '',
        description: '',
        solution: '',
        frequency: 'Trung bình'
    });

    const semesters = ['Kỳ 1', 'Kỳ 2', 'Kỳ 3', 'Kỳ 4', 'Kỳ 5', 'Kỳ 6', 'Kỳ 7', 'Kỳ 8', 'Kỳ 9'];

    const [courses, setCourses] = useState<Course[]>([
        {
            id: 1,
            name: 'Toán Cao Cấp',
            code: 'MATH101',
            semester: 'Kỳ 1',
            materials: [
                {
                    id: 1,
                    name: 'Chương 1: Giới hạn và liên tục',
                    type: 'PDF',
                    size: '2.5 MB',
                    date: '15/01/2024',
                    challenges: [
                        {
                            id: 1,
                            title: 'Khó hiểu khái niệm giới hạn',
                            description: 'Sinh viên gặp khó khăn trong việc hiểu định nghĩa epsilon-delta',
                            solution: 'Sử dụng hình ảnh trực quan và ví dụ thực tế để minh họa',
                            frequency: 'Cao'
                        },
                        {
                            id: 2,
                            title: 'Nhầm lẫn các quy tắc tính giới hạn',
                            description: 'Áp dụng sai quy tắc khi tính giới hạn dạng vô định',
                            solution: 'Lập bảng tóm tắt các quy tắc và dạng đặc biệt',
                            frequency: 'Cao'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Chương 2: Đạo hàm',
                    type: 'PDF',
                    size: '3.1 MB',
                    date: '22/01/2024',
                    challenges: [
                        {
                            id: 3,
                            title: 'Khó nhớ công thức đạo hàm',
                            description: 'Sinh viên hay quên các công thức đạo hàm cơ bản',
                            solution: 'Luyện tập thường xuyên và tạo flashcard',
                            frequency: 'Trung bình'
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Lập Trình C++',
            code: 'CS102',
            semester: 'Kỳ 1',
            materials: [
                {
                    id: 3,
                    name: 'Bài 1: Cú pháp cơ bản',
                    type: 'PDF',
                    size: '1.8 MB',
                    date: '10/01/2024',
                    challenges: [
                        {
                            id: 4,
                            title: 'Lỗi cú pháp thường gặp',
                            description: 'Thiếu dấu chấm phẩy, ngoặc không khớp',
                            solution: 'Sử dụng IDE có highlighting và auto-complete',
                            frequency: 'Cao'
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: 'Vật Lý Đại Cương',
            code: 'PHY101',
            semester: 'Kỳ 2',
            materials: [
                {
                    id: 4,
                    name: 'Phần 1: Cơ học',
                    type: 'PDF',
                    size: '4.2 MB',
                    date: '05/02/2024',
                    challenges: [
                        {
                            id: 5,
                            title: 'Khó phân tích lực',
                            description: 'Không biết cách vẽ và phân tích sơ đồ lực',
                            solution: 'Luyện tập vẽ nhiều sơ đồ và phân tích từng bước',
                            frequency: 'Cao'
                        }
                    ]
                }
            ]
        }
    ]);

    const coursesForSemester = useMemo(
        () => courses.filter((course) => course.semester === selectedSemester),
        [courses, selectedSemester]
    );

    const handleSemesterChange = (semester: string) => {
        setSelectedSemester(semester);
        setShowSemesterDropdown(false);
        setSelectedCourse(null);
        setSelectedMaterial(null);
    };

    const handleCourseSelect = (course: Course) => {
        setSelectedCourse(course);
        setSelectedMaterial(null);
    };

    const handleAddChallenge = () => {
        if (!newChallenge.title.trim() || !selectedCourse || !selectedMaterial) return;

        const updatedCourses = courses.map(course => {
            if (course.id === selectedCourse.id) {
                const updatedMaterials = course.materials.map(material => {
                    if (material.id === selectedMaterial.id) {
                        const updatedChallenges = editingId
                            ? material.challenges.map(c => c.id === editingId ? { ...newChallenge, id: editingId } : c)
                            : [...material.challenges, { ...newChallenge, id: Date.now() }];
                        return { ...material, challenges: updatedChallenges };
                    }
                    return material;
                });
                return { ...course, materials: updatedMaterials };
            }
            return course;
        });

        setCourses(updatedCourses);

        // Update selected states
        const updatedCourse = updatedCourses.find(c => c.id === selectedCourse.id);
        if (updatedCourse) {
            setSelectedCourse(updatedCourse);
            const updatedMaterial = updatedCourse.materials.find(m => m.id === selectedMaterial.id);
            if (updatedMaterial) {
                setSelectedMaterial(updatedMaterial);
            }
        }

        setNewChallenge({ title: '', description: '', solution: '', frequency: 'Trung bình' });
        setEditingId(null);
        setShowAddForm(false);
    };

    const handleEditChallenge = (challenge: Challenge) => {
        setEditingId(challenge.id);
        setShowAddForm(true);
        setNewChallenge({
            title: challenge.title,
            description: challenge.description,
            solution: challenge.solution,
            frequency: challenge.frequency
        });
    };

    const handleDeleteChallenge = (challengeId: number) => {
        if (!selectedCourse || !selectedMaterial) return;

        const updatedCourses = courses.map(course => {
            if (course.id === selectedCourse.id) {
                const updatedMaterials = course.materials.map(material => {
                    if (material.id === selectedMaterial.id) {
                        return {
                            ...material,
                            challenges: material.challenges.filter(c => c.id !== challengeId)
                        };
                    }
                    return material;
                });
                return { ...course, materials: updatedMaterials };
            }
            return course;
        });

        setCourses(updatedCourses);

        // Update selected states
        const updatedCourse = updatedCourses.find(c => c.id === selectedCourse.id);
        if (updatedCourse) {
            setSelectedCourse(updatedCourse);
            const updatedMaterial = updatedCourse.materials.find(m => m.id === selectedMaterial.id);
            if (updatedMaterial) {
                setSelectedMaterial(updatedMaterial);
            }
        }
    };

    const getFrequencyColor = (frequency: string) => {
        switch (frequency) {
            case 'Cao': return 'bg-red-100 text-red-700 border-red-200';
            case 'Trung bình': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Thấp': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertCircle className="w-7 h-7 text-orange-600" />
                        Thách Thức Thường Gặp
                    </h1>
                    <p className="text-slate-600 mt-1">Quản lý các thách thức học tập của sinh viên theo tài liệu môn học</p>
                </div>
            </div>

            {/* Semester Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Chọn Kỳ Học
                    </label>
                    <button
                        onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
                        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {selectedSemester.replace('Kỳ ', '')}
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-slate-600 font-medium">Đang chọn</div>
                                <div className="text-lg font-bold text-slate-800">{selectedSemester}</div>
                            </div>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showSemesterDropdown ? 'rotate-90' : ''
                                }`}
                        />
                    </button>

                    {showSemesterDropdown && (
                        <div className="absolute z-10 mt-2 w-full bg-white border-2 border-orange-200 rounded-xl shadow-xl overflow-hidden">
                            <div className="max-h-96 overflow-y-auto">
                                {semesters.map((semester) => (
                                    <button
                                        key={semester}
                                        onClick={() => handleSemesterChange(semester)}
                                        className={`w-full px-5 py-4 flex items-center gap-4 transition-all duration-150 ${selectedSemester === semester
                                                ? 'bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600'
                                                : 'hover:bg-orange-50 border-l-4 border-transparent'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${selectedSemester === semester ? 'bg-orange-600' : 'bg-slate-400'
                                            }`}>
                                            {semester.replace('Kỳ ', '')}
                                        </div>
                                        <span className={`font-semibold ${selectedSemester === semester ? 'text-orange-600' : 'text-slate-600'
                                            }`}>
                                            {semester}
                                        </span>
                                        {selectedSemester === semester && (
                                            <div className="ml-auto flex items-center gap-2 text-orange-600">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                                                <span className="text-sm font-medium">Đang chọn</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Course Grid */}
                {coursesForSemester.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">
                            Chọn Môn Học ({coursesForSemester.length} môn)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {coursesForSemester.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => handleCourseSelect(course)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedCourse?.id === course.id
                                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105'
                                            : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-md hover:scale-105 hover:-translate-y-1'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <AlertCircle className={`w-5 h-5 ${selectedCourse?.id === course.id ? 'text-orange-600' : 'text-slate-400'
                                            }`} />
                                        {selectedCourse?.id === course.id && (
                                            <div className="flex items-center gap-1 text-orange-600 text-xs font-semibold">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                                                Đang chọn
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-800 mb-1">{course.name}</h4>
                                    <p className="text-sm text-slate-600 mb-2">{course.code}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className={`px-2 py-1 rounded-full font-medium ${selectedCourse?.id === course.id
                                                ? 'bg-orange-100 text-orange-700'
                                                : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {course.materials.length} tài liệu
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {coursesForSemester.length === 0 && (
                    <div className="mt-6 text-center py-8 text-slate-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <p>Không có môn học nào trong {selectedSemester}</p>
                    </div>
                )}
            </div>

            {/* Materials List - Show when course is selected but no material selected */}
            {selectedCourse && !selectedMaterial && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-orange-600" />
                            Tài Liệu - {selectedCourse.name}
                        </h2>
                        <span className="text-sm text-slate-600">
                            {selectedCourse.materials.length} tài liệu
                        </span>
                    </div>

                    <div className="space-y-3">
                        {selectedCourse.materials.map((material) => (
                            <button
                                key={material.id}
                                onClick={() => setSelectedMaterial(material)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-orange-50 hover:shadow-md transition-all duration-200 group border-2 border-transparent hover:border-orange-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                        <FileText className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                                            {material.name}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
                                            <span>{material.type}</span>
                                            <span>•</span>
                                            <span>{material.size}</span>
                                            <span>•</span>
                                            <span>{material.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                                        {material.challenges.length} thách thức
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>

                    {selectedCourse.materials.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                            <p>Chưa có tài liệu nào</p>
                        </div>
                    )}
                </div>
            )}

            {/* Challenges Detail - Show when material is selected */}
            {selectedCourse && selectedMaterial && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    {/* Back Button and Material Info */}
                    <div className="mb-6">
                        <button
                            onClick={() => setSelectedMaterial(null)}
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-4 p-2 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                            Quay lại danh sách tài liệu
                        </button>

                        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <FileText className="w-6 h-6 text-orange-600" />
                                    <h3 className="font-bold text-slate-800 text-lg">{selectedMaterial.name}</h3>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 ml-9">
                                    <span>{selectedMaterial.type}</span>
                                    <span>•</span>
                                    <span>{selectedMaterial.size}</span>
                                    <span>•</span>
                                    <span>{selectedMaterial.date}</span>
                                    <span>•</span>
                                    <span className="font-semibold text-orange-600">
                                        {selectedMaterial.challenges.length} thách thức
                                    </span>
                                </div>
                            </div>

                            {/* Add Challenge Button */}
                            {!showAddForm && !editingId && (
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold whitespace-nowrap"
                                >
                                    <Plus className="w-4 h-4" />
                                    Thêm Thách Thức
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Add/Edit Challenge Form */}
                    {(showAddForm || editingId) && (
                        <div className="mb-6 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-orange-600" />
                                {editingId ? 'Chỉnh Sửa Thách Thức' : 'Thêm Thách Thức Mới'}
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Tiêu đề thách thức *
                                    </label>
                                    <input
                                        type="text"
                                        value={newChallenge.title}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                                        placeholder="Ví dụ: Khó hiểu khái niệm..."
                                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Mô tả chi tiết *
                                    </label>
                                    <textarea
                                        value={newChallenge.description}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                                        placeholder="Mô tả chi tiết về thách thức..."
                                        rows={3}
                                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Giải pháp đề xuất *
                                    </label>
                                    <textarea
                                        value={newChallenge.solution}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, solution: e.target.value })}
                                        placeholder="Các giải pháp và phương pháp giải quyết..."
                                        rows={3}
                                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Tần suất gặp phải
                                    </label>
                                    <select
                                        value={newChallenge.frequency}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, frequency: e.target.value as Challenge['frequency'] })}
                                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                                    >
                                        <option value="Cao">Cao</option>
                                        <option value="Trung bình">Trung bình</option>
                                        <option value="Thấp">Thấp</option>
                                    </select>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={handleAddChallenge}
                                        disabled={!newChallenge.title.trim()}
                                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-semibold"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingId ? 'Lưu Thay Đổi' : 'Thêm Thách Thức'}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingId(null);
                                            setNewChallenge({ title: '', description: '', solution: '', frequency: 'Trung bình' });
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
                                    >
                                        <X className="w-4 h-4" />
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Challenges List */}
                    <div>
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                            Danh Sách Thách Thức ({selectedMaterial.challenges.length})
                        </h3>

                        {selectedMaterial.challenges.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                <p>Chưa có thách thức nào được thêm</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {selectedMaterial.challenges.map((challenge, index) => (
                                    <div
                                        key={challenge.id}
                                        className="p-4 border-2 border-slate-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all bg-white"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="font-bold text-orange-600">{index + 1}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-slate-800 mb-2">{challenge.title}</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="font-semibold text-slate-700">Mô tả: </span>
                                                            <span className="text-slate-600">{challenge.description}</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold text-slate-700">Giải pháp: </span>
                                                            <span className="text-slate-600">{challenge.solution}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 ml-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getFrequencyColor(challenge.frequency)}`}>
                                                    {challenge.frequency}
                                                </span>
                                                <button
                                                    onClick={() => handleEditChallenge(challenge)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteChallenge(challenge.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Xóa"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChallengesManagement;
