#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import ncp from "copy-paste";
import { convertToMD } from "./lib/medium/convert";

const program = new Command();

const mdText = figlet.textSync("md", { font: "ANSI Shadow", horizontalLayout: "full" });
const ifyText = figlet.textSync("ify", { font: "ANSI Shadow", horizontalLayout: "full" });

const mdLines = mdText.split("\n");
const ifyLines = ifyText.split("\n");

// Merge the lines with different colors
const combinedLines = mdLines.map((line, i) => {
  return chalk.bold.cyan(line) + chalk.bold.white(ifyLines[i] || "");
});

console.log(combinedLines.join("\n"));

interface CliOptions {
  output?: string;
  print?: boolean;
  copy?: boolean;
  batch?: string;
}

const processUrl = async (url: string, options: CliOptions) => {
  const spinner = ora(`Fetching article: ${url}`).start();

  try {
    const result = await convertToMD(url);

    if (result.error) {
      spinner.fail(chalk.red(`Conversion failed for ${url}`));
      console.error(chalk.red(result.markdown));
      return;
    }

    spinner.succeed(chalk.green(`Conversion successful: ${result.title}`));

    const markdownContent = result.markdown;
    const title = result.title || "article";

    // Handle Copy to Clipboard
    if (options.copy) {
      ncp.copy(markdownContent);
      console.log(chalk.green("  ✓ Copied to clipboard"));
    }

    // Handle Print to Stdout
    if (options.print) {
      console.log("\n" + markdownContent + "\n");
    }

    // Handle File Saving
    // If we are printing and NOT explicitly asked to output to a file, we might skip saving?
    // The original logic saved unless --print was used.
    // Let's stick to: if --output is set, save there. If NOT --print, save to default.
    // If --print is set and NO --output, do not save (to avoid clutter if user just wants to pipe).
    // Wait, the original logic was:
    // if (options.output) { save } else if (!options.print) { save default }

    if (options.output) {
      // If batch, output might need to be a directory? Or specific file?
      // For batch, let's assume --output is a directory.
      // For single, it can be a file path.

      const outputPath = options.output;

      // Check if we are in batch mode or single mode context? 
      // Actually, let's keep it simple. If it looks like a directory or we are in batch, treat as dir.
      // But passing 'options' here is generic.

      // Let's rely on standard logic:
      // If it ends in .md, it's a file. If not, directory.
      // But for batch, we can't output multiple files to one .md file unless we append.
      // Let's assume for batch, output is a directory.

      const isMdFile = outputPath.toLowerCase().endsWith('.md');

      if (isMdFile) {
          await fs.outputFile(outputPath, markdownContent);
          console.log(chalk.green(`  ✓ Saved to ${outputPath}`));
      } else {
          // Treat as directory
          const safeTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
          const filename = `${safeTitle}.md`;
          const finalPath = path.join(outputPath, filename);
          await fs.outputFile(finalPath, markdownContent);
          console.log(chalk.green(`  ✓ Saved to ${finalPath}`));
      }

    } else if (!options.print) {
      // Default behavior: save to current directory with title as filename
      const safeTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filename = `${safeTitle}.md`;
      const outputPath = path.join(process.cwd(), filename);
      await fs.outputFile(outputPath, markdownContent);
      console.log(chalk.green(`  ✓ Saved to ${outputPath}`));
    }

  } catch (error: unknown) {
    spinner.fail(chalk.red(`An unexpected error occurred for ${url}`));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    } else {
      console.error(chalk.red(String(error)));
    }
  }
};

program
  .version("1.0.0")
  .description("Convert Medium articles to Markdown")
  .argument("[url]", "Medium article URL")
  .option("-o, --output <path>", "Output file path (or directory for batch)")
  .option("-p, --print", "Print to stdout")
  .option("-c, --copy", "Copy to clipboard")
  .option("-b, --batch <path>", "Batch process URLs from a file (one URL per line)")
  .action(async (url, options) => {
    
    if (options.batch) {
      try {
        const batchContent = await fs.readFile(options.batch, 'utf-8');
        const urls = batchContent.split('\n').map(u => u.trim()).filter(u => u.length > 0);
        
        console.log(chalk.blue(`Found ${urls.length} URLs in batch file.`));
        
        for (const batchUrl of urls) {
           await processUrl(batchUrl, options);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(chalk.red(`Error reading batch file: ${message}`));
        process.exit(1);
      }
      return;
    }

    if (!url) {
      const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'Enter Medium article URL:',
        validate: value => value ? true : 'Please enter a URL'
      });
      url = response.value;
    }

    if (!url) {
        console.log(chalk.red("No URL provided."));
        process.exit(1);
    }

    await processUrl(url, options);
  });

program.parse(process.argv);