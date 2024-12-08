import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

interface NavBarOptions {
  links: Array<{
    text: string
    link: string
  }>
}

const defaultOptions: NavBarOptions = {
  links: [
    { text: "About Me", link: "/aboutme" },
    { text: "Posts", link: "/posts" },
    { text: "My Research", link: "/research" }
  ]
}

export default ((userOpts?: Partial<NavBarOptions>) => {
  // Merge default options with user-provided options
  const opts = { ...defaultOptions, ...userOpts }

  function NavBar({ fileData }: QuartzComponentProps) {
    const currentPath = (fileData.slug ?? '') as string
    const rootPath = pathToRoot(currentPath as any)

    return (
      <nav class="navbar">
        <div class="navbar-container">
          {opts.links.map(({ text, link }) => (
            <a 
              href={rootPath + link} 
              class={`navbar-link ${currentPath === link.slice(1) ? 'active' : ''}`}
            >
              {text}
            </a>
          ))}
        </div>
      </nav>
    )
  }

  // Add styles to match the image
  NavBar.css = `
    .navbar {
      padding: 0;
      margin-bottom: 1rem;
    }

    .navbar-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
      font-family: var(--headerFont);
    }

    .navbar-link {
      width: 100%;
      color: var(--darkgray);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 400;
      transition: color 0.2s ease;
      padding: 0.2rem 0;
    }

    .navbar-link:hover {
      color: var(--secondary);
    }

    .navbar-link.active {
      color: var(--secondary);
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .navbar-container {
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }
    }
  `

  return NavBar
}) satisfies QuartzComponentConstructor 