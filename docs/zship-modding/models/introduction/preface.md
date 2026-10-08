---
sidebar_position: 1
---

# Preface
Getting ready to make a model mod for Ship of Harkinian or 2 Ship 2 Harkinian

## Setup
Before you can get started with your model mod, you’re going to need to get the right tools and resources prepped first:
- ### Blender 3.2 - 5.1.2
  https://www.blender.org/  
  Even if you don’t do your modeling in Blender normally, the add-on we’re going to use for importing and exporting assets is only compatible with Blender, so either way you still need it. Note that you can still make your model in whatever program you like, but to mod it into the game you would have to move it into Blender.

- ### Fast64
  https://github.com/HarbourMasters/fast64  
  The Blender add-on that allows us to import and export assets for SoH and 2Ship.  More details on this in the next section.

- ### Source O2R *or* Decompilation
  1. An oot.o2r or mm.o2r generated from a recent version of SoH or 2Ship respectively.  We use this in order to import game assets into Blender.  This is much easier to obtain than a decompilation, but cannot be used for scene importing.
  2. A decompilation of [Ocarina of Time](https://github.com/zeldaret/oot#installation) or [Majora's Mask](https://github.com/zeldaret/mm#installation).  The setup for this is much more involved and requires a Linux setup.  You can find the specific installation instructions by clicking on either link.  Unlike using a source o2r, there are no inherent limitations with importing when using a decomp.

## Basic Information
A brief introduction to the process for making model mods

Models in N64 games are stored as DisplayLists, or DLs as we often call them.  The main objective of any model mod is simply to export a model from blender with the right DL name and pathing to replace a pre-existing asset.  
Before starting with your model mod, check the rules for that port's Gamebanana page.  Note that if your mod idea breaks any of these rules then you will not be able to post your completed mod to Gamebanana.  
The following is the basic workflow for making a model mod; more details on each step can be found in their respective guides:

1. Import a vanilla model from a source O2R.
2. Line up your custom model with the imported model and, if doing a skeleton replacement, set up your model's vertex groups. 
3. Export your model from Blender into the proper directory.  You should be exporting to a folder named `alt` as to enable the alt toggling feature which allows players to turn your mod on and off at the press of a button.  This is required if you want to post your mod to gamebanana.
4. Find your `alt` folder in any file manager and compress it into a ZIP.  

:::note
Mods are packed as files called "O2Rs", which in reality are just renamed ZIP archives.  
Older versions of SoH (lower than 9.0.0) only support "OTR" mods, which are renamed MPQ files.  You can pack your files into an OTR using the [Retro program](https://github.com/HarbourMasters/retro/releases/latest) and edit pre-existing OTR mods with a program called "Ladik's MPQ Editor"
:::

5. Rename the file extension into `.o2r` and name your mod whatever you want.