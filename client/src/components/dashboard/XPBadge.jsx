import React from 'react'
import { Shield, Sparkles, ShieldCheck, Crown } from 'lucide-react'

const XPBadge = ({ xp }) => {
  if (xp >= 100) {
    return <Badge label="Verified" color="#00b894" icon={<Crown size={16} />} />
  } else if (xp >= 50) {
    return <Badge label="Trusted" color="#0984e3" icon={<ShieldCheck size={16} />} />
  } else if (xp >= 20) {
    return <Badge label="Rising" color="#fdcb6e" icon={<Sparkles size={16} />} />
  } else {
    return <Badge label="Newbie" color="#b2bec3" icon={<Shield size={16} />} />
  }
}

const Badge = ({ label, color, icon }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: 600,
      color: color,
      backgroundColor: `${color}1A`, // light background version
    }}
  >
    {icon} {label}
  </span>
)

export default XPBadge
