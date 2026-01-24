import os
import markdown2
from xhtml2pdf import pisa

def convert_md_to_pdf(md_file_path, pdf_file_path):
    """Converts a Markdown file to a PDF file."""
    try:
        with open(md_file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Convert Markdown to HTML
        html_content = markdown2.markdown(md_content, extras=["tables", "fenced-code-blocks"])
        
        # Add some basic CSS for PDF styling
        css = """
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #2c3e50; text-align: center; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; }
            h2 { color: #34495e; border-bottom: 1px solid #bdc3c7; padding-bottom: 5px; margin-top: 30px; }
            p { line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #bdc3c7; padding: 10px; text-align: left; }
            th { background-color: #ecf0f1; }
            code { background-color: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-family: Courier, monospace; }
            pre { background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        </style>
        """
        full_html = f"<html><head>{css}</head><body>{html_content}</body></html>"
        
        # Convert HTML to PDF
        with open(pdf_file_path, "wb") as pdf_file:
            pisa_status = pisa.CreatePDF(full_html, dest=pdf_file)
            
        if pisa_status.err:
            print(f"Error during PDF conversion for {md_file_path}")
        else:
            print(f"Successfully converted {md_file_path} to {pdf_file_path}")
            
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    docs_dir = os.path.join(os.path.dirname(__file__), '..', 'docs')
    output_dir = os.path.join(os.path.dirname(__file__), 'output')
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    if not os.path.exists(docs_dir):
        print(f"Error: Documentation directory '{docs_dir}' not found.")
        return

    files_to_convert = [f for f in os.listdir(docs_dir) if f.endswith('.md')]
    
    if not files_to_convert:
        print("No Markdown files found in the docs directory.")
        return

    print(f"Found {len(files_to_convert)} files to convert.")
    for filename in files_to_convert:
        md_path = os.path.join(docs_dir, filename)
        pdf_filename = filename.replace('.md', '.pdf')
        pdf_path = os.path.join(output_dir, pdf_filename)
        convert_md_to_pdf(md_path, pdf_path)

if __name__ == "__main__":
    main()
