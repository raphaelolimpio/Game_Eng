import 'package:flutter/material.dart';

class PostModelCard {
  final int id;
  final String title;
  final Image? image;
  final String description;
  final IconData? icon;

  PostModelCard({
    required this.id,
    required this.title,
    required this.image,
    required this.description,
    this.icon,
  });
  factory PostModelCard.fromJson(Map<String, dynamic> json) {
    return PostModelCard(
      id: json['id'] as int,
      title: json['title'] as String,
      image: json['image'] != null
          ? Image.network(json['image'] as String)
          : null,
      description: json['description'] as String,
      icon: json['icon'] as IconData?,
    );
  }
  Map<String, dynamic> toJson() {
    return {'id': id, 'title': title, 'icon': icon, 'description': description};
  }
}
