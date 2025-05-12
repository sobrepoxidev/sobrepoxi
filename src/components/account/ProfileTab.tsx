'use client';

import { useState, useEffect, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

type UserProfile = {
  id: string;
  full_name?: string | null;
  shipping_address?: any | null;
  preferences?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
};

type ProfileTabProps = {
  user: User;
  profile: UserProfile | null;
  updateFullName: (fullName: string) => Promise<void>;
  loading: boolean;
};

export default function ProfileTab({ user, profile, updateFullName, loading }: ProfileTabProps) {
  const t = useTranslations('Account');
  const [fullName, setFullName] = useState(profile?.full_name || user.user_metadata?.full_name || '');
  const [isEditing, setIsEditing] = useState(false);

  // Update fullName when profile or user changes
  useEffect(() => {
    setFullName(profile?.full_name || user.user_metadata?.full_name || '');
  }, [profile?.full_name, user.user_metadata?.full_name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fullName.trim() === '') return;
    
    await updateFullName(fullName);
    setIsEditing(false);
  };

  const createdAt = useMemo(() => 
    user.created_at ? new Date(user.created_at).toLocaleDateString() : '',
    [user.created_at]
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t('personalInfo')}
      </h2>
      
      <div className="space-y-6">
        {/* Email - No editable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('email')}
          </label>
          <div className="bg-gray-50 p-3 text-gray-800 rounded-md border border-gray-200">
            {user.email}
          </div>
        </div>
        
        {/* Nombre completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            {t('fullName')}
          </label>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-start gap-2">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={loading}
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {t('save')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(profile?.full_name || user.user_metadata?.full_name || '');
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div className="bg-gray-50 p-3 text-gray-800 rounded-md border border-gray-200 flex-grow">
                {fullName || t('notProvided')}
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="ml-2 text-teal-600 hover:text-teal-700 transition"
                disabled={loading}
              >
                {t('edit')}
              </button>
            </div>
          )}
        </div>
        
        {/* Información de la cuenta */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {t('accountInfo')}
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t('accountCreated')}</p>
                <p className="font-medium text-gray-800">{createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('accountId')}</p>
                <p className="font-medium text-gray-800 text-sm truncate">{user.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
