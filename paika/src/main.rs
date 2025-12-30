use chrono::{Local, Timelike};
use clap::Parser;
use std::fs;
use std::path::PathBuf;
use std::process::Command;

#[derive(Parser)]
#[command(name = "paika")]
#[command(about = "CLI utilities for Chris Paika's Jekyll blog")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(clap::Subcommand)]
enum Commands {
    /// Create a new blog post for the nearest hour and open in Helix
    Create,
    /// Serve the Jekyll site using docker-compose
    Serve,
}

fn get_blog_root() -> PathBuf {
    // Use current working directory - run paika from the blog root
    std::env::current_dir().expect("Failed to get current directory")
}

fn create_post() {
    let blog_root = get_blog_root();
    let posts_dir = blog_root.join("_posts");

    // Get current time rounded to nearest hour
    let now = Local::now();
    let minutes = now.minute();
    let rounded = if minutes >= 30 {
        now + chrono::Duration::minutes((60 - minutes) as i64)
    } else {
        now - chrono::Duration::minutes(minutes as i64)
    };

    let date_str = rounded.format("%Y-%m-%d").to_string();
    let time_str = rounded.format("%H:00:00").to_string();

    // Create filename with temp title
    let filename = format!("{}-temp-title.md", date_str);
    let file_path = posts_dir.join(&filename);

    // Check if file already exists
    if file_path.exists() {
        eprintln!("Error: Post already exists at {}", file_path.display());
        std::process::exit(1);
    }

    // Create front matter
    let front_matter = format!(
        r#"---
layout: post
title: "Temp Title"
date: {} {}
categories: blog
tags: temp
---

"#,
        date_str, time_str
    );

    // Write the file
    fs::write(&file_path, front_matter).expect("Failed to write post file");
    println!("Created new post: {}", file_path.display());

    // Open in Helix
    let status = Command::new("hx")
        .arg(&file_path)
        .status()
        .expect("Failed to open Helix editor");

    if !status.success() {
        eprintln!("Helix exited with non-zero status");
    }
}

fn serve_site() {
    let blog_root = get_blog_root();

    println!("Starting Jekyll server via docker-compose...");
    let status = Command::new("docker-compose")
        .arg("up")
        .current_dir(&blog_root)
        .status()
        .expect("Failed to run docker-compose");

    if !status.success() {
        eprintln!("docker-compose exited with non-zero status");
        std::process::exit(1);
    }
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Create => create_post(),
        Commands::Serve => serve_site(),
    }
}
