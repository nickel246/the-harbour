---
sidebar_position: 2
---

import f3d_converter from "./f3d_converter.png"
import f64_download from "./f64_download.png"
import f64_global from "./f64_global.png"
import preferences from "./preferences.png"
import workspace_settings from "./workspace_settings.png"
import cosmetic_entry from "./cosmetic_entry.png"

# Fast64
The import/export tool for N64 models.  In this guide we will be going over how to use and navigate the Fast64 addon for Blender.

## Installation
The version of Fast64 we will be using can be found here: https://github.com/HarbourMasters/fast64  
Start by clicking on the bright green “Code” button and select “Download Zip”

<img src={f64_download} alt="Downloading Fast64" width="1000" />

Now, open up Blender, and on the top bar click on “Edit” → “Preferences”

<img src={preferences} alt="Opening Preferences" width="400" />

Next, navigate to the “Add-ons” tab and in the top right either hit “Install” or the small dropdown button then “Install from Disk”, depending on your blender version.  
Find and select the Fast64 zip you installed, then restart Blender.  You have now successfully installed Fast64.

## Guided Tour
Fast 64 has a lot of features to you made need to use as you create your model mods, so this next section will go through some of the more important ones.

### Fast64 Tab
By clicking on the tab labeled Fast64 on the right (if you don’t see it try pressing the “N” key on your keyboard) you’ll find a long list of settings related to how the tool functions. In my experience, you really only need to know about two sections of these:

Here in the Fas64 Global Settings you can change your game depending on the port you want to mod for.  For SoH and 2Ship, you want to just keep it on OOT.  
Another useful setting here is the “Prefer RGBA Over CI”.  As you set textures, Fast64 tries to auto pick the most appropriate texture types, which sometimes might not be what you want, like in the case of the CI format which is really only useful for those who want to stay faithful to N64 limitations.  By contrast, the RGBA formats are the typical full color formats you would expect, so those might be preferable for your purposes.  For more information on texture formats, see the [section at the bottom of this page](#texture-formats).

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

If you want to play around with more specific settings, you can uncheck the "Show Simplified UI" setting, which will reveal all hidden settings.

:::tip
As of SoH version 9.3.0 and 2Ship version 5.0.0 you can now add your materials to the in-game cosmetic editor to be recolored by the player.  To set this up, all you need to do is use Primitive Color and/or Environment Color in your material, and below where you would normally set the color you want you will see a checkbox labeled "Dynamic Cosmetic Entry".  Select this option and enter a name for your entry as well as a name for the category you want it to appear in.  These can be whatever you want so long as no two names are the same.

<img src={cosmetic_entry} alt="Making a Dynamic Cosmetic Entry" width="400" />

It is recommended to only use this feature if your material does not use a colored texture.
:::

### Texture Formats
Fast64 supports 9 different texture formats, each with their own use cases.  If you intend to follow N64 limitations and conventions, these may be useful to know to help you optimize your textures.  If you do not plan on following N64 limitations, then you really only need either RGBA16 or RGBA32

| Texture Format | Abbreviation | Description | Notes |
| -------------- | ------------ | ----------- | ----- |
| Intensity 4-bit | i4 | 4 bits of B&W |
| Intensity 8-bit | i8 | 8 bits of B&W | Standard for non-color textures | If used in transparent material, black is interpreted as transparent
| Intensity Alpha 4-bit | ia4 | 2 bits of B&W, 2 bits of Alpha |
| Intensity Alpha 8-bit | ia8 | 4 bits of B&W, 4 bits of Alpha |
| Intensity Alpha 16-bit | ia16 | 8 bits of B&W, 8 bits of Alpha |
| Color Index 4-bit | ci4 | See Explanation Below |
| Color Index 8-bit | ci8 | See Explanation Below |
| RGBA 16-bit | rgba16 | 5 bits of red, 5 bits of blue, 5 bits of green, 1 bit of Alpha | Default for colored textures.  1 bit of alpha means pixels are either fully opaque or fully transparent; no in-between |
| RGBA 32-bit | rgba32 | 8 bits of red, 8 bits of blue, 8 bits of green, 8 bits of alpha | 

:::tip
**Color Indexed Textures**

Color indexing a texture essentially breaks it into two parts: the color indexed texture, and a palette texture.  Each unique color of your texture is converted into either a 4-bit or 8-bit reference to a color on the corresponding palette.  For example, one pixel on your color indexed texture, may have the value `10000011`, or 131, meaning it uses the color in slot 131 of the palette.

This is only really useful if you want to stay true to N64 limitations and conventions.  Otherwise, you don't need to worry about this at all.
:::