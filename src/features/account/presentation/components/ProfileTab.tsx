'use client';

import { useTranslations } from 'next-intl';
import { User } from '@supabase/supabase-js';
import { useState, useEffect, useMemo } from 'react';
import type { UserProfile } from '../../application/distribute';

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

  const readBox = 'bg-[#121212] p-3 text-gray-200 rounded-md border border-white/10';

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">
        {t('personalInfo')}
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {t('email')}
          </label>
          <div className={readBox}>
            {user.email}
          </div>
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            {t('fullName')}
          </label>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-start gap-2">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-grow p-2.5 bg-[#121212] border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40"
                disabled={loading}
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-gold-gradient text-black font-bold px-4 py-2 rounded-md hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50"
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
                  className="bg-white/5 text-gray-200 border border-white/10 px-4 py-2 rounded-md hover:bg-white/10 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div className={`${readBox} flex-grow`}>
                {fullName || t('notProvided')}
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="ml-2 text-amber-400 hover:text-amber-300 transition font-medium"
                disabled={loading}
              >
                {t('edit')}
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-2">
            {t('accountInfo')}
          </h3>
          <div className="bg-[#121212] p-4 rounded-md border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">{t('accountCreated')}</p>
                <p className="font-medium text-gray-200">{createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('accountId')}</p>
                <p className="font-medium text-gray-200 text-sm truncate">{user.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
