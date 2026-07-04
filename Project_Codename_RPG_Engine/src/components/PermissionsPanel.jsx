import { CAPABILITIES } from '../engine/defaultDatabase.js';
import Icon from './Icon.jsx';

export default function PermissionsPanel({ permissions, disabled, onSetRole, onToggleCapability }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="permissions" />
          Permissions
        </span>
      </div>

      <label className="field">
        <span>Active role</span>
        <select value={permissions.activeRoleId} onChange={(event) => onSetRole(event.target.value)}>
          {permissions.roles.map((role) => (
            <option key={role.id} value={role.id}>{role.label}</option>
          ))}
        </select>
      </label>

      <div className="permissions-grid">
        {permissions.roles.map((role) => (
          <article className="permission-card" key={role.id}>
            <h3>{role.label}</h3>
            {Object.values(CAPABILITIES).map((capability) => (
              <label className="check" key={capability}>
                <input
                  type="checkbox"
                  checked={role.capabilities.includes(capability)}
                  disabled={disabled || role.id === 'admin'}
                  onChange={(event) => onToggleCapability(role.id, capability, event.target.checked)}
                />
                {capability}
              </label>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
