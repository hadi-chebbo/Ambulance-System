import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';

type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';

type SelectOption = {
  label: string;
  value: string | number;
};

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  defaultValue?: string | number | boolean;
};

type EntityFormModalProps = {
  isOpen: boolean;
  title: string;
  fields: FormField[];
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void> | void;
  submitText?: string;
  isSubmitting?: boolean;
};

const EntityFormModal = ({
  isOpen,
  title,
  fields,
  onClose,
  onSubmit,
  submitText = 'Create',
  isSubmitting = false,
}: EntityFormModalProps) => {

  const buildInitialState = () => {
    const initial: Record<string, any> = {};
    fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initial[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initial[field.name] = false;
      } else {
        initial[field.name] = '';
      }
    });
    return initial;
  };

  const [formData, setFormData] = useState<Record<string, any>>(buildInitialState());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialState());
      setErrors({});
    }
  }, [isOpen, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required) {
        const isEmpty =
          field.type === 'checkbox'
            ? false
            : value === '' || value === null || value === undefined;

        if (isEmpty) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === 'checkbox' ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={Boolean(formData[field.name])}
                    onChange={handleChange}
                  />
                  {field.label}
                </label>
              ) : (
                <>
                  <label className="block text-sm font-medium">
                    {field.label}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  )}

                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg cursor-pointer">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EntityFormModal;