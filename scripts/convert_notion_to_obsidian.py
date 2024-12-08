import re
import sys

def process_notion_to_obsidian(file_path):
    # Regular expression to capture the <aside> content, including the emoji and text inside it
    aside_pattern = r'<aside>\s*📌\s*\*\*(.*?)\*\*(.*?)</aside>'

    # Open the Markdown file to read and process its content
    with open(file_path, 'r', encoding='utf-8') as infile:
        content = infile.read()

    # Function to replace the <aside> block with the Obsidian callout format
    def replace_aside(match):
        title = match.group(1).strip()  # Extract the bold title text (first group)
        body = match.group(2).strip()   # Extract the body content (second group)
        
        # Construct the Obsidian callout format
        return f"[!info] {title} {body}"

    # Use re.sub to replace all <aside> blocks with the Obsidian callout format
    updated_content = re.sub(aside_pattern, replace_aside, content)

    # Write the updated content back to the original file
    with open(file_path, 'w', encoding='utf-8') as outfile:
        outfile.write(updated_content)

    print(f"Successfully processed the file: {file_path}")


# Get the file path from command-line arguments (useful for GitHub Actions)
if len(sys.argv) != 2:
    print("Usage: python convert_notion_to_obsidian.py <path_to_md_file>")
    sys.exit(1)

file_path = sys.argv[1]

# Call the function to process the file
process_notion_to_obsidian(file_path)
