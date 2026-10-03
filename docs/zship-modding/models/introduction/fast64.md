---
sidebar_position: 2
---

import f3d_converter from "./f3d_converter.png"
import f64_download from "./f64_download.png"
import f64_global from "./f64_global.png"
import preferences from "./preferences.png"
import workspace_settings from "./workspace_settings.png"

# Fast64
The import/export tool for N64 models.
In this guide we will be going over how to use and navigate the Fast64 addon for Blender.

## Installation
The version of Fast64 we will be using can be found here: https://github.com/HarbourMasters/fast64
Start by clicking on the bright green “Code” button and select “Download Zip”

<img src={f64_download} alt="Downloading Fast64" width="1000" />

Now, open up Blender, and on the top bar click on “Edit” → “Preferences”

<img src={preferences} alt="Opening Preferences" width="400" />

Next, navigate to the “Add-ons” tab and in the top right either hit “Install” or the small dropdown button then “Install from Disk”, depending on your blender version.
Find and select the Fast64 zip you installed, then restart Blender.  You have now successfully installed Fast64.

## Guided Tour
Fast 64 has a lot of features to you made need to use as you create your model mods, so this next section will go through some of the more important ones

### Fast64 Tab
By clicking on the tab labeled Fast64 on the right (if you don’t see it try pressing the “N” key on your keyboard) you’ll find a long list of settings related to how the tool functions. In my experience, you really only need to know about two sections of these:

Here in the Fas64 Global Settings you can change your game depending on the port you want to mod for.  For SoH and 2Ship, you want to just keep it on OOT.
Another useful setting here is the “Prefer RGBA Over CI”.  As you set textures, Fast64 tries to auto pick the most appropriate texture types, which sometimes might not be what you want, like in the case of the CI format which is really only useful for those who want to stay faithful to N64 limitations.  By contrast the RGBA formats are the typical full color formats you would expect, so those might be preferable for your purposes.

<img src={f64_global} alt="Fast64 Global Settings" width="400" />

The other useful settings are here in the F3D Material Converter, where you can automatically convert standard materials into the F3D Materials that the ports use.  You can also recreate your materials or reload material presets if they seem bugged.

<img src={f3d_converter} alt="F3D Material Converter" width="400" />


### Z64 Tab
This is where all your actual importing and exporting will take place.  The individual importers and exporters will be covered in their respective guides, but there are still a couple settings here that are important to know no matter what type of model mod you want to make.

Here in the Workplace Settings is where you complete the setup for importing assets.  If you have a decompilation of OoT or MM handy you may use that for importing, but for these guides we will be importing from O2Rs since they’re simpler to obtain (you literally have to generate one in order to even play the port in the first place lol) and just overall easier to work with.
Start by clicking the “Use O2R Import” checkbox, then select the file icon in the O2R Path box and navigate to your OoT or MM source O2R (oot.o2r, oot_mq.o2r, mm.o2r).  You can ignore the “Game Version” box.  If you selected a MM O2R then also go down and select the “Enable MM Features” checkbox.

<img src={workspace_settings} alt="Workspace Settings" width="400" />


### F3D Materials
Whether you are converting BDSF materials to F3D or making them from scratch, it’s very important to understand the basics of how F3D materials work and how to set them up.

To start, navigate to the Material Properties tab in Blender (if you are unfamiliar look for the red circle icon towards the bottom right of your screen).  To make a new F3D material, simply click the “Create Fast3D Material” Button.  The default material preset is “OoT Shaded Solid”, which is just a solid color of your own choosing (referred to as primitive color in the settings) that uses the game’s built in shading system.  To choose a different preset simply click on the preset dropdown menu and select one of your choosing.
- **Shaded** - Uses the game’s shading system (generally recommended)
- **Unlit** - Uses no shading at all; Essentially makes your material emissive
- **Vertex Colored** - uses vertex coloring for shading
- **Solid** - Uses a solid color of your choosing
- **Texture** - Uses a texture/image of your choosing
- **Environment Mapped** - Warps your texture depending on the camera angle; used by many of the games’ metallic materials to simulate shine
- **Multitexture Lerp** - mixes two textures together, generally to add variance to a large mesh like grass
- **Transparent** - Makes your material transparent according to the alpha value of your primitive color and the alpha of your texture
- **Cutout** - “Cuts out” the opaque parts of your texture and makes everything else transparent; leaves a hard, jagged edge
- **Decal** - transparent material that takes render priority and helps prevent z-fighting
