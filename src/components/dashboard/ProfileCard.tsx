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
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-radar-500/20 to-cyan-500/20 border border-radar-500/20 flex items-center justify-center">
          <User className="w-5 h-5 text-radar-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{user.name || 'Your Profile'}</h3>
          <p className="text-xs text-neutral-500">{user.currentRole}</p>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2.5 text-xs">
          <Briefcase className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-400">
            {user.currentLevel} / {user.industry}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <MapPin className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-400">{user.location}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <Calendar className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-400">{user.yearsExperience} years experience</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Wrench className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold">Skills</span>
          <span className="text-[10px] text-neutral-700 tabular-nums">{user.skills.length}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {user.skills.map((skill, i) => (
            <Badge
              key={i}
              variant={skill.level === 'advanced' || skill.level === 'expert' ? 'success' : 'default'}
              size="md"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
