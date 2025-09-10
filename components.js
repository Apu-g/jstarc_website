// React components for JSTARC website

// TeamMemberCard component
class TeamMemberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  render() {
    const { name, role, image } = this.props;
    const { isHovered } = this.state;
    
    return React.createElement('div', {
      className: `team-member-card ${isHovered ? 'hovered' : ''}`,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, [
      React.createElement('img', {
        src: image,
        alt: name,
        key: 'img',
        className: isHovered ? 'rotate-animation' : ''
      }),
      React.createElement('h3', { key: 'name' }, name),
      React.createElement('p', { key: 'role' }, role),
      isHovered && React.createElement('div', {
        className: 'member-details',
        key: 'details'
      }, [
        React.createElement('p', { key: 'bio' }, 'Expert in Taekwondo with years of experience.'),
        React.createElement('button', {
          className: 'view-profile-btn',
          key: 'btn'
        }, 'View Profile')
      ])
    ]);
  }
}

// TeamGrid component
class TeamGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: []
    };
  }

  componentDidMount() {
    // Fetch team members from API
    fetch('/api/team')
      .then(response => response.json())
      .then(data => {
        this.setState({ teamMembers: data });
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
        // Fallback to static data if API fails
        this.setState({
          teamMembers: [
            { name: 'Master Nilesh', role: 'Team Captain', image: 'nilesh master.jpg' },
            { name: 'Master Jai', role: 'Senior Member', image: 'jai master.jpg' },
            { name: 'Team Member', role: 'Position', image: 'team.jpg' }
          ]
        });
      });
  }

  render() {
    return React.createElement('div', { className: 'team-grid' },
      this.state.teamMembers.map((member, index) => {
        return React.createElement(TeamMemberCard, {
          key: index,
          name: member.name,
          role: member.role,
          image: member.image
        });
      })
    );
  }
}

// Initialize React components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const teamGridContainer = document.querySelector('.team-grid');
  if (teamGridContainer) {
    // Replace the static team grid with React component
    ReactDOM.render(
      React.createElement(TeamGrid),
      teamGridContainer
    );
  }
});