# Copyright Documentation - Online Store

## 1. Introduction
This document outlines the copyright information for the online store developed by Leone Gabriel Mariano and their team. It details the ownership rights, restrictions, and responsibilities regarding the use of content, software, and other assets within the website.

## 2. Ownership and Rights

**Copyright Owner:** Leone Gabriel Mariano and team.

All materials on this website, including but not limited to text, images, logos, graphics, designs, user interfaces, and any associated software code, are owned by the development team. The copyright is protected by applicable intellectual property laws.

### UML Class Diagram: Ownership Structure
uml
@startuml
class "Leone Gabriel Mariano and Team" {
    + Owns all website content
}

class "Website Content" {
    + Text
    + Images
    + Code
    + Logos
    + UI/UX
}

"Leone Gabriel Mariano and Team" --|> "Website Content" : Owns
@enduml
## 3. License and Use of Content

The content available on the online store is provided for the purposes of viewing, purchasing, and interacting with the products and services. Unauthorized reproduction, distribution, or commercial use of any part of the site is prohibited unless prior permission is granted by the copyright owners.
UML Activity Diagram: Permission to Use Content
@startuml
start
:User requests permission;
if (Permission granted?) then (Yes)
    :Proceed with usage;
else (No)
    :Usage denied;
endif
stop
@enduml


Trademarks
All trademarks, service marks, trade names, and logos displayed on the website are the property of their respective owners. Any use of such marks without the proper authorization is strictly prohibited.

Restrictions
Users are prohibited from:

Modifying or copying any website content.
Using the content for commercial purposes without permission.
Attempting to reverse-engineer or extract source code.
Engaging in any activities that infringe on the intellectual property rights of the owners.

UML Sequence Diagram: Unauthorized Content Use
@startuml
User -> Website : Access content
User -> Content : Attempt to copy/modify
Content -> Website : Check permissions
Website -> User : Permission denied
@enduml


Liability Disclaimer
The development team is not responsible for any misuse of the content on the site or for any damages resulting from unauthorized access or use of the materials. Users are solely responsible for adhering to copyright and intellectual property laws.

Updates to Copyright Information
This document may be updated from time to time. All changes will be posted on the site, and users are encouraged to review the copyright policy regularly.

Last updated: [Insert Date]

---

This document includes:

- Ownership and rights details in UML class diagram.
- License and content use restrictions in an activity diagram.
- Restrictions on unauthorized usage via a sequence diagram.

You can modify and expand it according to specific requirements for Leone Gabriel Mariano's group.
