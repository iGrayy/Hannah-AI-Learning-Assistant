import React, { useState } from 'react';
import { FormData } from '../types';

interface UserFormProps {
  onSubmit: (data: FormData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Tin nhắn là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="card">
      <h2>Liên hệ với chúng tôi</h2>
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label htmlFor="name" style={labelStyle}>Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            value={formData.name}
            onChange={handleChange}
            style={errors.name ? inputErrorStyle : {}}
          />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            style={errors.email ? inputErrorStyle : {}}
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="message" style={labelStyle}>Tin nhắn:</label>
          <textarea
            id="message"
            name="message"
            className="input"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              ...textareaStyle,
              ...(errors.message ? inputErrorStyle : {}),
            }}
          />
          {errors.message && <span style={errorStyle}>{errors.message}</span>}
        </div>

        <button type="submit" className="button">
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const textareaStyle: React.CSSProperties = {
  resize: 'vertical',
  minHeight: '100px',
};

const inputErrorStyle: React.CSSProperties = {
  borderColor: '#dc3545',
};

const errorStyle: React.CSSProperties = {
  color: '#dc3545',
  fontSize: '14px',
  marginTop: '5px',
  display: 'block',
};

export default UserForm;
