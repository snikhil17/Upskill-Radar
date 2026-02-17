'use client';

import { User, MapPin, Briefcase, Calendar, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { UserProfile } from '@/types';

interface ProfileCardProps {
  user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{user.name || 'Your Profile'}</h3>
          <p className="text-sm text-slate-400">{user.currentRole}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <Briefcase className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400">
            {user.currentLevel} &middot; {user.industry}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400">{user.location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400">
            {user.yearsExperience} years experience
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-white">Your Skills</span>
          <Badge variant="default" size="sm">
            {user.skills.length}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, i) => (
            <Badge
              key={i}
              variant={skill.level === 'advanced' || skill.level === 'expert' ? 'success' : 'default'}
              size="sm"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
