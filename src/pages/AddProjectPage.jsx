import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { addProject } from '../store/slices/projectsSlice';
import { fetchClients } from '../store/slices/clientsSlice';
import Button from '../Components/ui/Button';
import ProjectIdentity from '../Components/ProjectIdentity';
import ProjectCommercials from '../Components/ProjectCommercials';
import ProjectLogistics from '../Components/ProjectLogistics';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: clients } = useSelector((state) => state.clients || { items: [] });
  const { isLoading: isSaving } = useSelector((state) => state.projects || { isLoading: false });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '',
    budget: '',
    deadline: '',
    category: 'Design & Branding',
  });

  useEffect(() => { 
    if (clients.length === 0) dispatch(fetchClients()); 
  }, [dispatch, clients.length]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(formData)).unwrap().then(() => navigate('/projects'));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 md:pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
           <Button 
  icon={<ChevronLeft size={24} />} 
  variant="ghost" 
  size="fit" 
  onClick={() => navigate(-1)} 
  className="!p-2.5 !rounded-2xl !text-slate-600 hover:!bg-slate-50"
/>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-[#2D3184] tracking-tight">Create New Project</h1>
              <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                Step 1 of 3: Project setup
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-2 rounded-full bg-[#3525B3]"></div>
            <div className="w-10 h-2 rounded-full bg-slate-200"></div>
            <div className="w-10 h-2 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* الجانب الأيسر */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. هوية المشروع */}
            <ProjectIdentity formData={formData} onChange={handleChange} />
            
            {/* 2. اللوجستيات والمواعيد ) */}
            <ProjectLogistics formData={formData} onChange={handleChange} />
          </div>

          {/* الجانب الأيمن: القسم المالي والملفات */}
          <div className="space-y-8">
            <ProjectCommercials 
              formData={formData} 
              onChange={handleChange} 
              clients={clients} 
              isSaving={isSaving} 
              onCancel={() => navigate(-1)} 
            />
          </div>
        </div>
        
<div className="flex flex-row items-center justify-between 
mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-100 w-full gap-2">
  <Button 
    text="Save as Draft" 
    variant="outline" 
    size="md"
    className="!px-3 md:!px-8 !py-2.5 md:!py-3 !text-[11px] md:!text-[14px] !rounded-xl" 
  />

  <div className="flex items-center gap-2 md:gap-6">
    <Button 
      text="Cancel" 
      variant="ghost" 
      size="md"
      onClick={() => navigate(-1)} 
      className="!px-2 md:!px-0 !text-[11px] md:!text-[14px]"
    />
    
    <Button 
      text={isSaving ? "Saving..." : "Next: Team & Tasks"} 
      variant="primary" 
      size="md"
      type="submit"
      disabled={isSaving}
      className="!px-2 md:!px-10 !py-2.5 md:!py-3 !text-[11px] md:!text-[14px] !rounded-xl"
    />
  </div>
</div>

        {/* أزرار الموبايل الثابتة */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex gap-3 z-20">
          <Button onClick={() => navigate(-1)} variant="white" size="md" text="Back" className="flex-1" />
          <Button type="submit" variant="primary" size="md" text="Continue" className="flex-[2]" />
        </div>
      </form>
    </div>
  );
};

export default AddProjectPage;