import { Badge } from '../Badge';
import PrimaryButton from '../PrimaryButton';

const tableHeaderStyle = {
  whiteSpace: 'nowrap',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  color: 'indigo',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1rem',
};
const tableStyle = {
  whiteSpace: 'nowrap',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontWeight: '500',
  color: '#111827',
  textAlign: 'center',
};

export const ExperienceTable = () => {
  return (
    <div className="overflow-x-auto my-4 shadow-md">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Experience Type</th>
            <th style={tableHeaderStyle}>Location</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>Actions</th>
            <th style={tableHeaderStyle}>Actions Taken</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr>
            <td style={tableStyle}>John Doe</td>
            <td style={tableStyle}>John Doe</td>
            <td style={tableStyle}>24/05/1995</td>
            <td style={tableStyle}>Web Developer</td>
            <td style={tableStyle}>$120,000</td>
            <td style={tableStyle}>
              <PrimaryButton className="flex items-center justify-center py-2" type="submit">
                View
              </PrimaryButton>
            </td>
            <td style={tableStyle}>
              <Badge type="success" message="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
