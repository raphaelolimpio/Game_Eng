import 'dart:ffi';

class PostModelUser {
  final int id;
  final String name;
  final String email;
  final String password;
  final String registration;
  final Float points;
  final int level;
  final String nameGroup;
  final int period;
  final String function;

  PostModelUser({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.registration,
    required this.points,
    required this.level,
    required this.nameGroup,
    required this.period,
    required this.function,
  });
  factory PostModelUser.fromJson(Map<String, dynamic> json) {
    return PostModelUser(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      password: json['password'] as String,
      registration: json['registration'] as String,
      points: json['points'] as Float,
      level: json['level'] as int,
      nameGroup: json['nameGroup'] as String,
      period: json['period'] as int,
      function: json['function'] as String,
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'password': password,
      'registration': registration,
      'points': points,
      'level': level,
      'nameGroup': nameGroup,
      'period': period,
      'function': function,
    };
  }
}
